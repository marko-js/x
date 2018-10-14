import * as t from "../../definitions";
import normalizeTemplateLiteral from "../../util/normalize-template-string";
import HTMLDocumentType from "./document-type";
import HTMLDeclaration from "./declaration";
import HTMLCDATA from "./cdata";
import HTMLElement from "./element";
import HTMLText from "./text";
import HTMLPlaceholder from "./placeholder";
import HTMLScriptlet from "./scriptlet";

export const visitor = {
  HTMLDocumentType,
  HTMLDeclaration,
  HTMLCDATA,
  HTMLElement,
  HTMLText,
  HTMLPlaceholder,
  HTMLScriptlet,
  HTMLComment(path) {
    path.remove();
  },
  Program: {
    exit(path) {
      path.traverse({
        // Merges out.write calls
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
            path.node.arguments[0] = normalizeTemplateLiteral(
              quasis,
              expressions
            );
          }
        }
      });
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
