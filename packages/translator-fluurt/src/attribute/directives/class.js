import { types as t } from "@marko/babel-types";
import { isNativeTag } from "@marko/babel-utils";
export default function(tag, _, value) {
  const { hub } = tag;
  if (value.isStringLiteral()) return;
  if (!isNativeTag(tag)) return;
  // TODO: Check if we can partially pre evaluate this.
  value.replaceWith(
    t.callExpression(hub.importRuntime(tag, "classAttr"), [value.node])
  );
}
