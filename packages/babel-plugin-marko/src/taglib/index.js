import fs from "fs";
import path from "path";
import resolveFrom from "resolve-from";
import loader from "marko/src/compiler/taglib-loader";
import lookup from "marko/src/compiler/taglib-lookup";

["core", "html", "svg"].forEach(name => {
  const file = path.join(__dirname, name, "marko.json");
  const lib = loader.createTaglib(file);
  loader.loadTaglibFromProps(lib, JSON.parse(fs.readFileSync(file, "utf-8")));
  lookup.registerTaglib(lib);
});

export function buildLookup(dirname) {
  // create lookup and load specific tags from old compiler.
  const lookupInstance = lookup.buildLookup(dirname);

  lookupInstance.getTag("no-update").renderer = resolveFrom(
    "marko/src/components/taglib/preserve-tag.js",
    dirname
  );

  lookupInstance.getTag("html-comment").renderer = resolveFrom(
    "marko/src/taglibs/html/html-comment-tag.js",
    dirname
  );

  lookupInstance.getTag("init-components").renderer = resolveFrom(
    "marko/src/components/taglib/init-components-tag.js",
    dirname
  );

  lookupInstance.getTag("component-globals").renderer = resolveFrom(
    "marko/src/components/taglib/component-globals-tag.js",
    dirname
  );
  return lookupInstance;
}
