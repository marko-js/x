import * as t from "../definitions";
import normalizeTemplateLiteral from "../util/normalize-template-string";

export const visitor = {
  // Creates the final render function.
  Program(path) {
    const { node, hub } = path;
    const componentTypeIdentifier = path.scope.generateUidIdentifier(
      "marko_componentType"
    );
    const templateIdentifier = path.scope.generateUidIdentifier(
      "marko_template"
    );
    const renderIdentifier = path.scope.generateUidIdentifier("marko_render");
    const rendererIdentifier = hub.importNamed(
      path,
      "marko/src/components/helpers",
      "r",
      "marko_renderer"
    );
    const defineComponentIdentifier = hub.importNamed(
      path,
      "marko/src/components/helpers",
      "c",
      "marko_defineComponent"
    );
    const templateRendererMember = t.memberExpression(
      templateIdentifier,
      t.identifier("_")
    );
    const componentId = hub.getClientPath(hub.filename);
    node.body.push(
      t.variableDeclaration("const", [
        t.variableDeclarator(
          templateIdentifier,
          t.callExpression(hub.importNamed(path, "marko/src/html", "t"), [
            t.identifier("__filename")
          ])
        ),
        t.variableDeclarator(
          componentTypeIdentifier,
          t.stringLiteral(componentId)
        )
      ])
    );
    node.body.push(
      t.assignmentExpression(
        "=",
        templateRendererMember,
        t.callExpression(rendererIdentifier, [
          renderIdentifier,
          t.objectExpression([
            t.objectProperty(t.identifier("___type"), componentTypeIdentifier)
          ])
        ])
      )
    );
    node.body.push(
      t.assignmentExpression(
        "=",
        t.memberExpression(templateIdentifier, t.identifier("Component")),
        t.callExpression(defineComponentIdentifier, [
          hub._componentClass || t.nullLiteral(),
          templateRendererMember
        ])
      )
    );
    node.body.push(t.exportDefaultDeclaration(templateIdentifier));
    node.body.push(
      t.functionDeclaration(
        renderIdentifier,
        [
          t.identifier("input"),
          t.identifier("out"),
          t.identifier("__component"), // TODO: convert to generated var and store reference.
          t.identifier("component"),
          t.identifier("state")
        ],
        Object.assign(t.blockStatement([]), { body: hub._renderBody })
      )
    );
  },
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
      path.node.arguments[0] = normalizeTemplateLiteral(quasis, expressions);
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
