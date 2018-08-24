import * as t from "../../../../definitions";
import { toStatement, strictAttributes } from "../_util";
export { toStatement, strictAttributes };

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
  const ifAttr = startTag.attributes.find(attr => attr.name === "if");
  const ifStatement = t.ifStatement(
    ifAttr.value,
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

      if (name === "else") {
        node.ifStatement = ifStatement;

        if (removePath) {
          removePath.remove();
        }
      }
    }
  }

  return ifStatement;
}
