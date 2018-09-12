import { join, basename } from "path";
import fs from "fs";

const EMPTY_OBJECT = {};
const directives = requireDir(join(__dirname, "directives"));
const modifiers = requireDir(join(__dirname, "modifiers"));

export default function(path) {
  const attributes = path.get("startTag").get("attributes");

  for (const attr of attributes) {
    let name = attr.get("name").node;
    let [, modifier] = /:(.*)$/.exec(name) || EMPTY_OBJECT;
    const modifierTransform = modifiers[modifier];
    const node = path.node;

    if (modifierTransform) {
      name = attr.node.name = name.slice(0, name.length - modifier.length - 1);
      modifierTransform(path, attr);
      if (node !== path.node) break;
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
