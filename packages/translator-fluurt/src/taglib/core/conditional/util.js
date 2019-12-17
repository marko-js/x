import { types as t } from "@marko/babel-types";
import { getArgOrSequence } from "@marko/babel-utils";
import getComputedExpression from "../../../util/get-computed-expression";

export function buildIfStatement(path) {
  if (!path.get("arguments").length) {
    const name = path.get("name");
    throw name.buildCodeFrameError(
      `Invalid '<${name.node.value}>' tag, expected arguments like '<${name.node.value}(test)>'.`
    );
  }

  const ifStatement = t.conditionalExpression(
    argsToComputed(path),
    t.arrowFunctionExpression([], path.node.body.body)
  );

  let nextPath = path.getNextSibling();

  // Provide the if statement to the next part of the if chain.
  if (nextPath.isMarkoTag()) {
    const nextTagName = nextPath.get("name");
    if (
      nextTagName.isStringLiteral({ value: "else" }) ||
      nextTagName.isStringLiteral({ value: "else-if" })
    ) {
      nextPath.node.ifStatement = ifStatement;
    }
  }

  return ifStatement;
}

export function argsToComputed(path) {
  const args = path.get("arguments");
  let arg = args[0];
  const normalized = getArgOrSequence(path);

  if (t.isSequenceExpression(normalized)) {
    [arg] = args[0].replaceWith(normalized);
    for (let i = 1; i < args.length; i++) {
      args[i].remove();
    }
  }

  return getComputedExpression(arg) || arg.node;
}
