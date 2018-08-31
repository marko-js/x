import * as t from "./definitions";
import normalizeTemplateLiteral from "./util/normalize-template-string";

export const visitor = {
  CallExpression(path) {
    let curPath = path;
    const quasis = [""];
    const expressions = [];
    do {
      const content = getOutContent(curPath.node);
      if (!content) break;
      if (curPath !== path) curPath.remove();
      quasis.push("");
      expressions.push(content);

      if (t.isExpressionStatement(curPath.parentPath)) {
        curPath = curPath.parentPath;
      }
    } while ((curPath = curPath.getNextSibling()));

    if (expressions.length > 1) {
      const last = expressions[expressions.length - 1];
      path.node.arguments[0] = normalizeTemplateLiteral(quasis, expressions);
      if (last.end != null) {
        // TODO: figure out why loc is lost.
        path.node.end = last.end;
        path.node.loc.end = last.loc.end;
      }
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
