import * as t from "../../../definitions";

export function buildIfStatement(path, args) {
  const { node } = path;
  const { body } = node;

  if (!args || !args.length) {
    throw path
      .get("name")
      .buildCodeFrameError(
        "Invalid '<if>' tag, expected arguments like '<if(test)>'."
      );
  }

  const ifStatement = t.ifStatement(
    args.length === 1 ? args[0] : t.sequenceExpression(args),
    t.blockStatement(body)
  );

  let nextPath = path.getNextSibling();

  // Provide the if statement to the next part of the if chain.
  if (nextPath.node && t.isMarkoTag(nextPath.node)) {
    const { node } = nextPath;
    const { name } = node;

    if (name.value === "else") {
      node.ifStatement = ifStatement;
    }
  }

  return ifStatement;
}
