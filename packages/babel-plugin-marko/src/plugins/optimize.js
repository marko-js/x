import * as t from "../definitions";
import normalizeTemplateLiteral from "../util/normalize-template-string";

export const visitor = {
  ExpressionStatement(path) {
    let curPath = path;
    const quasis = [""];
    const expressions = [];
    const removals = [];

    do {
      const content = getOutContent(curPath.node);
      if (!content) break;
      if (curPath !== path) removals.push(curPath);
      quasis.push("");
      expressions.push(content);
    } while ((curPath = curPath.getNextSibling()));

    removals.forEach(removal => removal.remove());

    if (expressions.length > 1) {
      path
        .get("expression.arguments.0")
        .replaceWith(normalizeTemplateLiteral(quasis, expressions));
    }
  }
};

function getOutContent(node) {
  if (t.isExpressionStatement(node)) {
    return getOutContent(node.expression);
  }

  return (
    t.isCallExpression(node) &&
    t.isMemberExpression(node.callee) &&
    node.callee.object.name === "out" &&
    node.callee.property.name === "w" &&
    node.arguments[0]
  );
}
