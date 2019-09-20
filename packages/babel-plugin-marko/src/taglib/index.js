import fs from "fs";
import path from "path";
// import resolveFrom from "resolve-from";
import { loader, lookup } from "marko/src/taglib";

["html", "svg", "migrate"].forEach(name => {
  const file = path.join(__dirname, name, "marko.json");
  const lib = loader.createTaglib(file);
  loader.loadTaglibFromProps(lib, JSON.parse(fs.readFileSync(file, "utf-8")));
  lookup.registerTaglib(lib);
});

export function buildLookup(dirname) {
  // create lookup and load specific tags from old compiler.
  return lookup.buildLookup(dirname);
}
