import * as t from "../../../../definitions";
export default function(path, attr) {
  const { hub } = path;
  const {
    node: { value }
  } = attr;
  if (t.isStringLiteral(value)) return;
  attr.get("value").replaceWith(
    t.callExpression(
      hub.importNamed(
        path,
        "marko/src/runtime/html/helpers", // TODO: expose CL in vdom.
        "cl",
        "marko_class_merge"
      ),
      [value]
    )
  );
}
