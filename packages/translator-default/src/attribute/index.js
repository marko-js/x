import { isNativeTag, getTagDef } from "@marko/babel-utils";
import { join, basename } from "path";
import fs from "fs";

const directives = requireDir(join(__dirname, "directives"));
const modifiers = requireDir(join(__dirname, "modifiers"));
const EMPTY_ARRAY = [];
const EVENT_REG = /^(on(?:ce)?)(-)?(.*)$/;

export default function(attr) {
  const tag = attr.parentPath;
  const value = attr.get("value");
  const { name, modifier, arguments: args } = attr.node;

  if (!tag.node) {
    return;
  }

  if (modifier) {
    const modifierTranslate = modifiers[modifier];
    if (modifierTranslate) {
      const tagNode = tag.node;
      const attrNode = attr.node;
      modifierTranslate(tag, attr, value);
      if (tag.node !== tagNode || attr.node !== attrNode) return;
    } else {
      throw attr.buildCodeFrameError(`Unsupported modifier "${modifier}".`);
    }
  }

  let [, eventType, isDash, eventName] = EVENT_REG.exec(name) || EMPTY_ARRAY;

  if (eventType && args) {
    if (!args.length) {
      throw attr.buildCodeFrameError("Event handler is missing arguments.");
    }

    if (!value.isBooleanLiteral(true)) {
      throw value.buildCodeFrameError(
        `"${name}(handler, ...args)" does not accept a value.`
      );
    }

    if (!isDash) {
      // When the event is not in dash case we normalized differently for html tags and custom tags.

      if (isNativeTag(tag)) {
        // Lowercase the string
        // Example: onMouseOver → mouseover
        eventName = eventName.toLowerCase();
      } else {
        // Convert first character to lower case:
        // Example: onBeforeShow → beforeShow
        eventName = eventName.charAt(0).toLowerCase() + eventName.slice(1);
      }
    }

    const handlers = (tag.node.handlers = tag.node.handlers || {});
    if (handlers[eventName]) {
      throw attr.buildCodeFrameError(
        "Duplicate event handlers are not supported."
      );
    }

    handlers[eventName] = {
      arguments: args,
      once: eventType === "once"
    };

    attr.remove();
    return;
  }

  const directiveTranslate = directives[name];
  if (directiveTranslate) {
    const tagNode = tag.node;
    const attrNode = attr.node;
    directiveTranslate(tag, attr, value);
    if (tag.node !== tagNode || attr.node !== attrNode) return;
  }

  if (attr.node && !attr.node.allowArguments && args && args.length) {
    throw attr.buildCodeFrameError(
      `Unsupported arguments on the "${name}" attribute.`
    );
  }

  const tagDef = getTagDef(tag);

  if (tagDef) {
    if (!tagDef.html && !tagDef.getAttribute(name)) {
      throw attr.buildCodeFrameError(
        `<${
          tag.get("name.value").node
        }> does not support the "${name}" attribute.`
      );
    }
  }
}

function requireDir(dir) {
  return fs
    .readdirSync(dir)
    .filter(entry => /\.js$/.test(entry))
    .map(entry => join(dir, entry))
    .reduce((r, file) => {
      r[basename(file).replace(/\.js$/, "")] = require(file).default;
      return r;
    }, {});
}
