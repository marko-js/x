import { types as t } from "@marko/babel-types";
import { isHTMLTag } from "@marko/babel-utils";
export default function(tag, _, value) {
  const { hub } = tag;
  if (value.isStringLiteral()) return;
  if (!isHTMLTag(tag)) return;
  value.replaceWith(
    t.callExpression(hub.importNamed(tag, "fluurt", "classAttr"), [value.node])
  );
}
