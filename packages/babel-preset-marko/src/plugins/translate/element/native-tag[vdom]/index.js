import SELF_CLOSING from "self-closing-tags";
import * as t from "../../../../definitions";
import write from "../../../../util/vdom-out-write";
import {
  replaceInRenderBody,
  toStatement,
  assertNoParams
} from "../../../../taglib/core/util";
import { getAttrs } from "../util";

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {
  const {
    node: { parent, key, startTag, children, properties, handlers }
  } = path;

  const tagName = startTag.name.value;
  const tagProperties = properties.slice();
  const isSelfClosing = SELF_CLOSING.indexOf(tagName) !== -1;
  const attrsObj = getAttrs(path, true);
  const writeArgs = [
    isSelfClosing ? "e" : "be",
    startTag.name,
    attrsObj,
    key,
    t.identifier("component"),
    t.numericLiteral(0), // TODO flags.
    t.numericLiteral(0)
  ];

  assertNoParams(path);

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
