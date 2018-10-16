import * as t from "../definitions";
import checksum from "../util/checksum";

export const visitor = {
  // Creates the final render function.
  Program(path) {
    const { node, hub } = path;
    const { meta, isImplicit, isSplit } = hub;
    const renderBlock = hub._renderBlock;
    const componentClass = hub._componentClass;
    node.body.splice(node.body.indexOf(renderBlock), 1);

    const componentTypeIdentifier = path.scope.generateUidIdentifier(
      "marko_componentType"
    );
    const templateIdentifier = path.scope.generateUidIdentifier(
      "marko_template"
    );
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
    const templateMetaMember = t.memberExpression(
      templateIdentifier,
      t.identifier("meta")
    );
    const componentId = checksum(hub.getClientPath(hub.filename));
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

    const templateRenderOptionsProps = [
      t.objectProperty(t.identifier("___type"), componentTypeIdentifier)
    ];

    if (isImplicit) {
      templateRenderOptionsProps.push(
        t.objectProperty(t.identifier("___implicit"), t.booleanLiteral(true))
      );
    }

    if (isSplit) {
      templateRenderOptionsProps.push(
        t.objectProperty(t.identifier("___split"), t.booleanLiteral(true))
      );
    }

    node.body.push(
      t.assignmentExpression(
        "=",
        templateRendererMember,
        t.callExpression(rendererIdentifier, [
          t.functionExpression(
            null,
            [
              t.identifier("input"),
              t.identifier("out"),
              t.identifier("__component"), // TODO: convert to generated var and store reference.
              t.identifier("component"),
              t.identifier("state")
            ],
            renderBlock
          ),
          t.objectExpression(templateRenderOptionsProps)
        ])
      )
    );
    node.body.push(
      t.assignmentExpression(
        "=",
        t.memberExpression(templateIdentifier, t.identifier("Component")),
        t.callExpression(defineComponentIdentifier, [
          componentClass || t.nullLiteral(),
          templateRendererMember
        ])
      )
    );

    const metaObject = t.objectExpression([
      t.objectProperty(t.identifier("id"), componentTypeIdentifier)
    ]);

    if (meta.component) {
      metaObject.properties.push(
        t.objectProperty(
          t.identifier("component"),
          t.stringLiteral(hub.resolveRelativePath(meta.component))
        )
      );
    }

    if (meta.deps.length) {
      metaObject.properties.push(
        t.objectProperty(
          t.identifier("deps"),
          hub.parseExpression(
            JSON.stringify(
              meta.deps.map(
                file =>
                  typeof file === "string"
                    ? hub.resolveRelativePath(file)
                    : file
              )
            ),
            hub.code.length
          )
        )
      );
    }

    if (meta.tags.length) {
      metaObject.properties.push(
        t.objectProperty(
          t.identifier("tags"),
          t.arrayExpression(meta.tags.map(tag => t.stringLiteral(tag)))
        )
      );
    }

    node.body.push(t.assignmentExpression("=", templateMetaMember, metaObject));
    node.body.push(t.exportDefaultDeclaration(templateIdentifier));
  }
};
