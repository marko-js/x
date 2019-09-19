import { resolve } from "path";
import SELF_CLOSING from "self-closing-tags";
import * as t from "../../../../definitions";
import write from "../../../../util/html-out-write";
import withPreviousLocation from "../../../../util/with-previous-location";
import translateAttributes from "./attributes";
import { assertNoParams, assertNoArgs } from "../../../../taglib/core/util";

const EMPTY_OBJECT = {};

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {
  assertNoParams(path);
  assertNoArgs(path);

  const { hub, node } = path;
  const {
    name: { value: tagName },
    body: { body },
    properties,
    handlers,
    tagDef
  } = node;
  const tagProperties = properties.slice();

  if (tagDef) {
    const { parseOptions = EMPTY_OBJECT } = tagDef;
    if (parseOptions.import) {
      // TODO: the taglib should be updated to support this as a top level option.
      hub.meta.deps.push(resolve(tagDef.dir, parseOptions.import));
    }
  }

  if (handlers) {
    Object.entries(handlers).forEach(
      ([eventName, { arguments: args, once }]) => {
        const delegateArgs = [t.stringLiteral(eventName), args[0]];
        if (args.length > 1) {
          delegateArgs.push(t.arrayExpression(args.slice(1)));
        }

        // TODO: look into only sending this if once is true.
        delegateArgs.push(t.booleanLiteral(once));

        // TODO: why do we output eventName twice.
        tagProperties.push(
          t.objectProperty(
            t.stringLiteral(`on${eventName}`),
            t.callExpression(
              t.memberExpression(
                hub._componentDefIdentifier,
                t.identifier("d")
              ),
              delegateArgs
            )
          )
        );
      }
    );
  }

  if (hub.isImplicit && tagProperties.length) {
    path.pushContainer(
      "attributes",
      t.markoAttribute("data-marko", t.objectExpression(tagProperties))
    );
  }

  let writeStartNode = withPreviousLocation(
    write`<${tagName}${translateAttributes(path, path.get("attributes"))}>`,
    node
  );

  if (SELF_CLOSING.indexOf(tagName) !== -1) {
    path.replaceWith(writeStartNode);
    return;
  }

  let writeEndNode = write`</${tagName}>`;

  const { bodyOnlyIf } = path.node;
  if (bodyOnlyIf) {
    const negatedBodyOnlyIf = t.unaryExpression("!", bodyOnlyIf, true);
    writeStartNode = t.ifStatement(negatedBodyOnlyIf, writeStartNode);
    writeEndNode = t.ifStatement(negatedBodyOnlyIf, writeEndNode);
  }

  let needsBlock;
  for (const childNode of body) {
    if (t.isVariableDeclaration(childNode)) {
      if (childNode.kind === "const" || childNode.kind === "let") {
        needsBlock = true;
        break;
      }
    }
  }

  path.replaceWithMultiple(
    [writeStartNode]
      .concat(needsBlock ? t.blockStatement(body) : body)
      .concat(writeEndNode)
  );
}
