import escape from "escape-html";
import { SELF_CLOSING } from "./constants";

export { classAttr, styleAttr } from "../shared";
export { escape };

export function dynamicTag(tagName, attrs, out) {
  if (typeof tagName === "string") {
    tagName = escape(tagName);
    out.write(`<${tagName}${stringifyAttrs(attrs)}>`);
    if (SELF_CLOSING.indexOf(tagName) === -1) {
      if (attrs.renderBody) attrs.renderBody(out);
      out.write(`<${tagName}/>`);
    }

    return;
  } else if (tagName) {
    tagName = tagName.renderBody || tagName;
    if (typeof tagName === "function") {
      // TODO: proper is component check.
      tagName(attrs, out);
      return;
    }
  }

  throw new Error(`Marko: Invalid dynamic tag "${tagName}".`);
}

export function stringifyAttrs(attrs) {
  const result = "";

  for (var key in attrs) {
    // Skip invalid attrs https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
    if (/[\s'"</=\\]/.test(key)) continue;
    const val = attrs[key];
    // Skip render and event handler functions.
    if (typeof val === "function") continue;
    result += stringifyAttr(key, val);
  }

  return result;
}

export function stringifyAttr(key, value) {
  if (value != null && value !== false) {
    return ` ${key}="${escape(value)}"`;
  }

  return "";
}
