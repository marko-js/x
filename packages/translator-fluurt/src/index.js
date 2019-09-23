import { types as t } from "@marko/babel-types";
import MarkoDocumentType from "./document-type";
import MarkoDeclaration from "./declaration";
import MarkoCDATA from "./cdata";
import MarkoTag from "./tag";
import MarkoAttribute from "./attribute";
import MarkoText from "./text";
import MarkoPlaceholder from "./placeholder";
import MarkoComment from "./comment";
import MarkoScriptlet from "./scriptlet";
import "./taglib";

export const visitor = {
  MarkoDocumentType,
  MarkoDeclaration,
  MarkoCDATA,
  MarkoTag,
  MarkoAttribute,
  MarkoText,
  MarkoScriptlet,
  MarkoPlaceholder,
  MarkoComment,
  Program: {
    enter(path) {
      // Move non static content into the renderBody.
      const renderBlock = t.blockStatement([]);
      path
        .get("body")
        .filter(isRenderContent)
        .forEach(childPath => {
          renderBlock.body.push(childPath.node);
          childPath.remove();
        });
      path.pushContainer(
        "body",
        t.exportDefaultDeclaration(
          t.arrowFunctionExpression([t.identifier("input")], renderBlock)
        )
      );
    }
  }
};

function isRenderContent(path) {
  const { node } = path;
  return t.MARKO_TYPES.includes(node.type) && !node.static;
}
