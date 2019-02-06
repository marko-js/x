import * as t from "../../../../definitions";

export default function(path, attr) {
  const { hub } = path;
  const value = attr.get("value");
  value.replaceWith(
    t.callExpression(
      t.memberExpression(hub._componentDefIdentifier, t.identifier("elId")),
      [value.node]
    )
  );
}
