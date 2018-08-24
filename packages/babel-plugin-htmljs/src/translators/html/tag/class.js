import * as t from "../../../definitions";

export default translate;
translate.options = {
  html: { ignoreAttributes: true },
  rawOpenTag: true
};

function translate(path) {
  const program = path.parent;
  if (!t.isProgram(program)) {
    throw path.buildCodeFrameError(
      "class must be at the root of your Marko template."
    );
  }

  const {
    node,
    hub: {
      file: {
        ast: { parseExpression }
      }
    }
  } = path;
  const { startTag } = node;
  const { rawValue: code, start } = startTag;

  path.replaceWith(
    t.exportNamedDeclaration(
      t.variableDeclaration("const", [
        t.variableDeclarator(
          t.identifier("component"),
          parseExpression(code, start)
        )
      ]),
      []
    )
  );
}
