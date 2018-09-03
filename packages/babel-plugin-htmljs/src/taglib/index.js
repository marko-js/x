import fs from "fs";
import path from "path";
import loader from "marko/src/compiler/taglib-loader";
import finder from "marko/src/compiler/taglib-finder";
import lookup from "marko/src/compiler/taglib-lookup";

["core", "core/tag/directives"].forEach(name => {
  const file = path.join(__dirname, name, "marko.json");
  const lib = loader.createTaglib(file);
  loader.loadTaglibFromProps(lib, JSON.parse(fs.readFileSync(file, "utf-8")));
  lookup.registerTaglib(lib);
});

export function buildLookup(dirname) {
  return lookup.buildLookup(dirname);
}
