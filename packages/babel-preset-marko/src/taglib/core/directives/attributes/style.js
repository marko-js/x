import * as t from "../../../../definitions";
export default function(path, attr) {
  const { hub } = path;
  const {
    node: { value }
  } = attr;
  if (t.isStringLiteral(value)) return;
  attr
    .get("value")
    .replaceWith(
      t.callExpression(
        hub.importNamed(
          path,
          "marko/src/runtime/helpers",
          "cl",
          "marko_style_merge"
        ),
        [value]
      )
    );
}