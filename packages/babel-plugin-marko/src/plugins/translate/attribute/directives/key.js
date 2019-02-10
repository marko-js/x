import normalizeTemplateLiteral from "../../../../util/normalize-template-string";

export default function(tag, attr) {
  tag.node.key = normalizeTemplateLiteral(["@", ""], [attr.get("value").node]);
  attr.remove();
}
