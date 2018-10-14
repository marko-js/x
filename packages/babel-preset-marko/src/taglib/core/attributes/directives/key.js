import normalizeTemplateLiteral from "../../../../util/normalize-template-string";

export default function(path, attr) {
  path.node.key = normalizeTemplateLiteral(["@", ""], [attr.get("value").node]);
  attr.remove();
}
