import { join, basename } from "path";
import fs from "fs";

const directives = requireDir(join(__dirname, "directives"));
const modifiers = requireDir(join(__dirname, "modifiers"));
const EMPTY_ARRAY = [];
const EVENT_REG = /^(on(?:ce)?)-?(.*)$/;

export default function(path) {
  const { hub, node } = path;
  const startTag = path.get("startTag");
  const attributes = startTag.get("attributes");

  for (const attr of attributes) {
    const { name, value, modifier, arguments: args } = attr.node;

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

      if (value && value.value !== true) {
        throw attr
          .get("value")
          .buildCodeFrameError(
            `"${name}(handler, ...args)" does not accept a value.`
          );
      }

      // TODO: normalize eventName
      const handlers = (node.handlers = node.handlers || {});
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

    const directiveTransform = directives[name];
    if (directiveTransform) {
      directiveTransform(path, attr);
      if (node !== path.node) break;
    }

    if (args && attr.node && !attr.node.allowArguments) {
      throw attr.buildCodeFrameError("Unsupported arguments on attribute.");
    }
  }

  if (!node.key) {
    node.key = hub.nextKey();
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
