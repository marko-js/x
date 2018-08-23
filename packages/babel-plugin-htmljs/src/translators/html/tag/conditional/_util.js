import * as t from "../../../../definitions";
import { toStatement } from "../_util";
export { toStatement };

export function parseIfStatement(path) {
  const {
    node,
    hub: {
      file: {
        ast: { parseExpression }
      }
    }
  } = path;
  const { startTag, children } = node;
  const { rawValue } = startTag;
  const expressionString = rawValue.replace(/^(?:else-)?if\s*/, "");
  const startPos = startTag.start + (rawValue.length - expressionString.length);
  const expression = parseExpression(expressionString, startPos);
  const ifStatement = t.ifStatement(
    expression,
    t.blockStatement(children.map(toStatement))
  );

  let nextPath = path.getNextSibling();

  // Provide the if statement to the next part of the if chain.
  if (nextPath) {
    let removePath;

    // Remove empty whitespace between blocks.
    if (t.isHTMLText(nextPath.node) && /^\s*$/.test(nextPath.node.value)) {
      removePath = nextPath;
      nextPath = nextPath.getNextSibling();
    }

    if (t.isHTMLElement(nextPath.node)) {
      const { node } = nextPath;
      const { name } = node.startTag;

      if (name === "else" || name === "else-if") {
        node.ifStatement = ifStatement;

        if (removePath) {
          removePath.remove();
        }
      }
    }
  }

  return ifStatement;
}
