import { types as t } from "@marko/babel-types";
import { isHTMLTag } from "@marko/babel-utils";
export default function(tag, _, value) {
  const { hub } = tag;
  if (value.isStringLiteral()) return;
  if (!isHTMLTag(tag)) return;
  value.replaceWith(
    t.callExpression(
      hub.importNamed(
        tag,
        "marko/src/runtime/html/helpers", // TODO: expose CL in vdom.
        "cl",
        "marko_class_merge"
      ),
      [value.node]
    )
  );
}
