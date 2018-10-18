import * as t from "../../definitions";
import { replaceInRenderBody } from "./util";
import normalizeTemplateLiteral from "../../util/normalize-template-string";

export default function(path) {
  const startTag = path.get("startTag");
  const attributes = startTag.get("attributes");
  const { children } = path.node;
  const keyAttr = attributes.find(attr => attr.node.name === "key");

  if (!keyAttr) {
    throw startTag.buildCodeFrameError(
      '"key" tag must have a "key" or default attribute.'
    );
  }

  if (attributes.length > 1) {
    throw startTag.buildCodeFrameError(
      '"key" tag can only have a "key" or default attribute.'
    );
  }

  if (!children.length) {
    throw startTag.buildCodeFrameError('"key" tag must have children.');
  }

  const keyValue = normalizeTemplateLiteral(
    ["@", ""],
    [keyAttr.get("value").node]
  );
  children
    .filter(child => t.isHTMLElement(child))
    .forEach(child => (child.key = keyValue));

  replaceInRenderBody(path, children);
}
