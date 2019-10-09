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
import optimize from "./optimize";
export { default as taglibs } from "./taglib";

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
      const { hub } = path;
      const { options } = hub;
      const runtime = `fluurt/${options.output === "html" ? "html" : "dom"}`;
      const renderBlock = t.blockStatement([]);
      hub.importRuntime = (path, name) => hub.importNamed(path, runtime, name);
      path
        .get("body")
        .filter(isRenderContent)
        .forEach(childPath => {
          renderBlock.body.push(childPath.node);
          childPath.remove();
        });

      const rendererIdentifier = path.scope.generateUidIdentifier("renderer");
      const renderIdentifier = path.scope.generateUidIdentifier("render");
      path.pushContainer(
        "body",
        t.exportDefaultDeclaration(
          t.functionDeclaration(
            rendererIdentifier,
            [t.identifier("input")],
            renderBlock
          )
        )
      );
      path.pushContainer(
        "body",
        t.variableDeclaration("const", [
          t.variableDeclarator(
            renderIdentifier,
            t.callExpression(hub.importNamed(path, runtime, "createRenderer"), [
              t.callExpression(hub.importNamed(path, runtime, "register"), [
                t.stringLiteral(hub.meta.id),
                rendererIdentifier
              ])
            ])
          )
        ])
      );

      path.pushContainer(
        "body",
        t.exportNamedDeclaration(null, [
          t.exportSpecifier(renderIdentifier, t.identifier("render"))
        ])
      );
    },
    exit: optimize
  }
};

function isRenderContent(path) {
  const { node } = path;
  return t.MARKO_TYPES.includes(node.type) && !node.static;
}
