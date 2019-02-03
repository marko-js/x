import SELF_CLOSING from "self-closing-tags";
import * as t from "../../../../definitions";
import write from "../../../../util/vdom-out-write";
import {
  replaceInRenderBody,
  toStatement,
  assertNoParams,
  assertNoArgs
} from "../../../../taglib/core/util";
import { getAttrs } from "../util";

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {
  const { node } = path;
  const {
    name: { value: tagName },
    key,
    body,
    properties,
    handlers
  } = node;

  const tagProperties = properties.slice();
  const isSelfClosing = SELF_CLOSING.indexOf(tagName) !== -1;
  const attrsObj = getAttrs(path, true);
  const writeArgs = [
    isSelfClosing ? "e" : "be",
    node.name,
    attrsObj,
    key,
    t.identifier("component"),
    t.numericLiteral(0), // TODO flags.
    t.numericLiteral(0)
  ];

  assertNoParams(path);
  assertNoArgs(path);

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
                t.identifier("__component"),
                t.identifier("d")
              ),
              delegateArgs
            )
          )
        );
      }
    );
  }

  if (tagProperties.length) {
    writeArgs.push(t.objectExpression(tagProperties));
  }

  let writeStartNode = write(...writeArgs);

  if (isSelfClosing) {
    replaceInRenderBody(path, writeStartNode);
    return;
  }

  let writeEndNode = write("ee");

  const { bodyOnlyIf } = path.node;
  if (bodyOnlyIf) {
    const negatedBodyOnlyIf = t.unaryExpression("!", bodyOnlyIf, true);
    writeStartNode = t.ifStatement(
      negatedBodyOnlyIf,
      t.blockStatement([toStatement(writeStartNode)])
    );
    writeEndNode = t.ifStatement(
      negatedBodyOnlyIf,
      t.blockStatement([toStatement(writeEndNode)])
    );
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

  replaceInRenderBody(
    path,
    [writeStartNode]
      .concat(needsBlock ? t.blockStatement(body.map(toStatement)) : body)
      .concat(writeEndNode)
  );
}
