import { join, basename } from "path";
import fs from "fs";

const DIR = join(__dirname, "attributes");
const directives = fs
  .readdirSync(DIR)
  .map(entry => join(DIR, entry))
  .reduce((r, file) => {
    r[basename(file).replace(/\.js$/, "")] = require(file).default;
    return r;
  }, {});

export default function(path) {
  const attributes = path.get("startTag").get("attributes");

  for (const attr of attributes) {
    const name = attr.get("name").node;
    const fn = directives[name];
    if (!fn) continue;
    const node = path.node;
    fn(path, attr);
    if (node !== path.node) break;
  }
}
