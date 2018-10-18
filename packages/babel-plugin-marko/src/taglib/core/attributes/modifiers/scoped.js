import * as t from "../../../../definitions";

export default function(path, attr) {
  const value = attr.get("value");
  value.replaceWith(
    t.callExpression(
      t.memberExpression(t.identifier("__component"), t.identifier("elId")),
      [value.node]
    )
  );
}
