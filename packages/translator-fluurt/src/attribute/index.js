import fs from "fs";
import { join, basename } from "path";

const directives = requireDir(join(__dirname, "directives"));
const modifiers = requireDir(join(__dirname, "modifiers"));

export default function(attr) {
  const tag = attr.parentPath;
  const value = attr.get("value");
  const { name, modifier, arguments: args } = attr.node;

  if (modifier) {
    const modifierTranslate = modifiers[modifier];
    if (modifierTranslate) {
      modifierTranslate(tag, attr, value);
      const tagNode = tag.node;
      const attrNode = attr.node;
      if (tag.node !== tagNode || attr.node !== attrNode) return;
    } else {
      throw attr.buildCodeFrameError(`Unsupported modifier "${modifier}".`);
    }
  }

  const directiveTranslate = directives[name];
  if (directiveTranslate) {
    directiveTranslate(tag, attr, value);
    const tagNode = tag.node;
    const attrNode = attr.node;
    if (tag.node !== tagNode || attr.node !== attrNode) return;
  }

  if (attr.node && !attr.node.allowArguments && args && args.length) {
    throw attr.buildCodeFrameError("Unsupported arguments on attribute.");
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
