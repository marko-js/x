import { types as t } from "@marko/babel-types";
import { isHTMLTag } from "@marko/babel-utils";
export default function(tag, attr, value) {
  const { hub } = tag;
  if (value.isStringLiteral()) return;
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
        [value.node]
      )
    );
}
