import { types as t } from "@marko/babel-types";
import { isNativeTag } from "@marko/babel-utils";
export default function(tag, attr, value) {
  const { hub } = tag;
  if (value.isStringLiteral()) return;
  if (!isNativeTag(tag)) return;
  attr
    .get("value")
    .replaceWith(
      t.callExpression(hub.importDefault(tag, "fluurt", "styleAttr"), [
        value.node
      ])
    );
}
