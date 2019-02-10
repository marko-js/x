import * as t from "../../../definitions";

export function buildIfStatement(path, args) {
  if (!args || !args.length) {
    throw path
      .get("name")
      .buildCodeFrameError(
        "Invalid '<if>' tag, expected arguments like '<if(test)>'."
      );
  }

  const ifStatement = t.ifStatement(
    args.length === 1 ? args[0] : t.sequenceExpression(args),
    t.blockStatement(path.node.body)
  );

  let nextPath = path.getNextSibling();

  // Provide the if statement to the next part of the if chain.
  if (nextPath.isMarkoTag()) {
    if (nextPath.get("name").isStringLiteral({ value: "else" })) {
      nextPath.node.ifStatement = ifStatement;
    }
  }

  return ifStatement;
}
