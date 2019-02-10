import normalizeTemplateLiteral from "../../../../util/normalize-template-string";

export default function(tag, attr, value) {
  tag.set("key", normalizeTemplateLiteral(["@", ""], [value.node]));
  attr.remove();
}
