import SELF_CLOSING from "self-closing-tags";
import * as t from "../../../../definitions";
import write from "../../../../util/html-out-write";
import withPreviousLocation from "../../../../util/with-previous-location";
import translateAttributes from "./attributes";
import {
  replaceInRenderBody,
  toStatement,
  assertNoParams
} from "../../../../taglib/core/util";

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {
  const {
    node: { parent, startTag, children, endTag }
  } = path;

  const {
    handlers,
    name: { value: tagName }
  } = startTag;
  const attributes = path.get("startTag").get("attributes");

  assertNoParams(path);

  if (handlers) {
    // TODO: prevent escaping this with the attr helper.
    startTag.attributes.push(
      t.htmlAttribute(
        "data-marko",
        t.objectExpression(
          Object.entries(handlers).reduce(
            (props, [eventName, { arguments: args, once }]) => {
              const delegateArgs = [t.stringLiteral(eventName), args[0]];
              if (args.length > 1) {
                delegateArgs.push(t.arrayExpression(args.slice(1)));
              }

              // TODO: look into only sending this if once is true.
              delegateArgs.push(t.booleanLiteral(once));

              // TODO: why do we output eventName twice.
              props.push(
                t.objectProperty(
                  t.identifier(`on${eventName}`),
                  t.callExpression(
                    t.memberExpression(
                      t.identifier("__component"),
                      t.identifier("d")
                    ),
                    delegateArgs
                  )
                )
              );
              return props;
            },
            []
          )
        )
      )
    );

    // TODO: Hack to push to existing attributes path, should revisit,
    attributes.push(path.get("startTag").get("attributes")[attributes.length]);
  }

  let writeStartNode = withPreviousLocation(
    write`<${tagName}${translateAttributes(attributes)}>`,
    startTag
  );

  if (SELF_CLOSING.indexOf(tagName) !== -1) {
    replaceInRenderBody(path, writeStartNode);
    return;
  }

  let writeEndNode = withPreviousLocation(write`</${tagName}>`, endTag);

  const { bodyOnlyIf } = path.node;
  if (bodyOnlyIf) {
    writeStartNode = t.ifStatement(
      bodyOnlyIf,
      t.blockStatement([toStatement(writeStartNode)])
    );
    writeEndNode = t.ifStatement(
      bodyOnlyIf,
      t.blockStatement([toStatement(writeEndNode)])
    );
  }

  let needsBlock;
  if (!t.isProgram(parent)) {
    for (const node of children) {
      if (t.isVariableDeclaration(node)) {
        if (node.kind === "const" || node.kind === "let") {
          needsBlock = true;
          break;
        }
      }
    }
  }

  replaceInRenderBody(
    path,
    [writeStartNode]
      .concat(
        needsBlock ? t.blockStatement(children.map(toStatement)) : children
      )
      .concat(writeEndNode)
  );
}
