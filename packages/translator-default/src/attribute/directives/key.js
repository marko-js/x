import { normalizeTemplateString } from "@marko/babel-utils";

export default function(tag, attr, value) {
  tag.set("key", normalizeTemplateString`@${value.node}`);
  attr.remove();
}
