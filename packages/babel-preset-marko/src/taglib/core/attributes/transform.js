import { join, basename } from "path";
import fs from "fs";

const directives = requireDir(join(__dirname, "directives"));
const modifiers = requireDir(join(__dirname, "modifiers"));
const EMPTY_ARRAY = [];
const EVENT_REG = /^(on(?:ce)?)-?(.*)$/;

export default function(path) {
  const startTag = path.get("startTag");
  const attributes = startTag.get("attributes");

  debugger;

  for (const attr of attributes) {
    const { name, modifier, arguments: args } = attr.node;
    const node = path.node;

    if (modifier) {
      const modifierTransform = modifiers[modifier];
      if (modifierTransform) {
        modifierTransform(path, attr);
        if (node !== path.node) break;
      } else {
        throw attr.buildCodeFrameError(`Unsupported modifier "${modifier}".`);
      }
    }

    const [, eventType, eventName] = EVENT_REG.exec(name) || EMPTY_ARRAY;

    if (eventType) {
      if (!args) {
        throw attr.buildCodeFrameError("Event handler is missing arguments.");
      }

      // TODO: normalize eventName
      const handlers = (startTag.node.handlers = startTag.node.handlers || {});
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
    } else if (args) {
      throw attr.buildCodeFrameError("Unsupported arguments on attribute.");
    }

    const directiveTransform = directives[name];
    if (directiveTransform) {
      directiveTransform(path, attr);
      if (node !== path.node) break;
    }
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
