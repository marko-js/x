import * as t from "../../../../definitions";
import { isHTMLTag } from "../../../../taglib/core/util";
export default function(tag, attr) {
  const { hub } = tag;
  const {
    node: { value }
  } = attr;
  if (t.isStringLiteral(value)) return;
  if (!isHTMLTag(tag)) return;
  attr
    .get("value")
    .replaceWith(
      t.callExpression(
        hub.importDefault(
          tag,
          "marko/src/runtime/vdom/helper-styleAttr",
          "marko_style_merge"
        ),
        [value]
      )
    );
}
