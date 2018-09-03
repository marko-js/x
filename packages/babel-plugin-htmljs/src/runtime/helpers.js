import escape from "escape-html";
import { SELF_CLOSING } from "../constants";

export function classList(input) {
  if (input) {
    const type = typeof input;
    if (type === "string") return input;

    let result = "";

    if (Array.isArray(input)) {
      for (const val of input) {
        const names = classList(val);
        if (names) result += ` ${names}`;
      }
    } else if (type === "object") {
      for (const name in input) {
        if (input.hasOwnProperty(name) && input[name]) {
          result += ` ${name}`;
        }
      }
    }

    return result.slice(1);
  }
}

export function dynamicTag(tagName, attrs, out) {
  if (typeof tagName === "string") {
    tagName = escape(tagName);
    out.write(`<${tagName}${stringifyAttrs(attrs)}>`);
    if (SELF_CLOSING.indexOf(tagName) === -1) {
      if (attrs.renderBody) attrs.renderBody(out);
      out.write(`<${tagName}/>`);
    }
  } else {
    // TODO: proper is component check.
    tagName(attrs, out);
  }
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
    return " " + key + '="' + escape(value) + '"';
  }

  return "";
}
