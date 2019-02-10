import * as t from "../../../../definitions";
import { isHTMLTag } from "../../../../taglib/core/util";
export default function(tag, attr) {
  const { hub } = tag;
  const {
    node: { value }
  } = attr;
  if (t.isStringLiteral(value)) return;
  if (!isHTMLTag(tag)) return;
  attr.get("value").replaceWith(
    t.callExpression(
      hub.importNamed(
        tag,
        "marko/src/runtime/html/helpers", // TODO: expose CL in vdom.
        "cl",
        "marko_class_merge"
      ),
      [value]
    )
  );
}
