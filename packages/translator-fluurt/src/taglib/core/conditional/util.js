import { types as t } from "@marko/babel-types";
import { getArgOrSequence } from "@marko/babel-utils";

export function buildIfStatement(path, args) {
  if (!args || !args.length) {
    const name = path.get("name");
    throw name.buildCodeFrameError(
      `Invalid '<${name.node.value}>' tag, expected arguments like '<${name.node.value}(test)>'.`
    );
  }

  const ifStatement = t.conditionalExpression(
    getArgOrSequence(path),
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
