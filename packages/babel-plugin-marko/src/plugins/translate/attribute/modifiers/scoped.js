import * as t from "../../../../definitions";

export default function(tag, attr) {
  const { hub } = tag;
  const value = attr.get("value");
  value.replaceWith(
    t.callExpression(
      t.memberExpression(hub._componentDefIdentifier, t.identifier("elId")),
      [value.node]
    )
  );
}
