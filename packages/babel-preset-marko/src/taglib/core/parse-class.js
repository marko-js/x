import * as t from "../../definitions";

export default function(path) {
  const { node, hub } = path;
  const { startTag } = node;
  const { rawValue: code, start } = startTag;

  // TODO: ensure only one. (add hub helper)
  // TODO: convert to object expression.

  return t.exportNamedDeclaration(
    t.variableDeclaration("const", [
      t.variableDeclarator(
        t.identifier("component"),
        hub.parseExpression(code, start)
      )
    ]),
    []
  );
}
