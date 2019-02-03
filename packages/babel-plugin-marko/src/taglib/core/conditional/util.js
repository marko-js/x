import * as t from "../../../definitions";
import { toStatement } from "../util";

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
    t.blockStatement(body.map(toStatement))
  );

  let nextPath = path.getNextSibling();

  // Provide the if statement to the next part of the if chain.
  if (nextPath.node) {
    let removePath;

    // Remove empty whitespace between blocks.
    if (t.isHTMLText(nextPath.node) && /^\s*$/.test(nextPath.node.value)) {
      removePath = nextPath;
      nextPath = nextPath.getNextSibling();
    }

    if (t.isHTMLTag(nextPath.node)) {
      const { node } = nextPath;
      const { name } = node;

      if (name.value === "else") {
        node.ifStatement = ifStatement;

        if (removePath) {
          removePath.remove();
        }
      }
    }
  }

  return ifStatement;
}
