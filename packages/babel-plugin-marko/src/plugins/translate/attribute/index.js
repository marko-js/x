import { isHTMLTag } from "../../../taglib";
import { join, basename } from "path";
import fs from "fs";

const directives = requireDir(join(__dirname, "directives"));
const modifiers = requireDir(join(__dirname, "modifiers"));
const EMPTY_ARRAY = [];
const EVENT_REG = /^(on(?:ce)?)(-)?(.*)$/;

export default function(attr) {
  const tag = attr.parentPath;
  const tagNode = tag.node;
  const { name, value, modifier, arguments: args } = attr.node;

  if (modifier) {
    const modifierTranslate = modifiers[modifier];
    if (modifierTranslate) {
      modifierTranslate(tag, attr);
      if (tagNode !== tag.node) return;
    } else {
      throw attr.buildCodeFrameError(`Unsupported modifier "${modifier}".`);
    }
  }

  let [, eventType, isDash, eventName] = EVENT_REG.exec(name) || EMPTY_ARRAY;

  if (eventType) {
    if (!args || !args.length) {
      throw attr.buildCodeFrameError("Event handler is missing arguments.");
    }

    if (value && value.value !== true) {
      throw attr
        .get("value")
        .buildCodeFrameError(
          `"${name}(handler, ...args)" does not accept a value.`
        );
    }

    if (!isDash) {
      // When the event is not in dash case we normalized differently for html tags and custom tags.

      if (isHTMLTag(tagNode)) {
        // Lowercase the string
        // Example: onMouseOver → mouseover
        eventName = eventName.toLowerCase();
      } else {
        // Convert first character to lower case:
        // Example: onBeforeShow → beforeShow
        eventName = eventName.charAt(0).toLowerCase() + eventName.slice(1);
      }
    }

    const handlers = (tagNode.handlers = tagNode.handlers || {});
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
  }

  const directiveTranslate = directives[name];
  if (directiveTranslate) {
    directiveTranslate(tag, attr);
    if (tagNode !== tag.node) return;
  }

  if (attr.node && !attr.node.allowArguments && args && args.length) {
    throw attr.buildCodeFrameError("Unsupported arguments on attribute.");
  }
}

function requireDir(dir) {
  return fs
    .readdirSync(dir)
    .map(entry => join(dir, entry))
    .reduce((r, file) => {
      r[basename(file).replace(/\.js$/, "")] = require(file).default;
      return r;
    }, {});
}
