import fs from "fs";
import path from "path";
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

  lookupInstance.getTag("no-update").renderer = require.resolve(
    "marko/src/components/taglib/preserve-tag.js"
  );

  lookupInstance.getTag("html-comment").renderer = require.resolve(
    "marko/src/taglibs/html/html-comment-tag.js"
  );

  lookupInstance.getTag("init-components").renderer = require.resolve(
    "marko/src/components/taglib/init-components-tag.js"
  );

  lookupInstance.getTag("component-globals").renderer = require.resolve(
    "marko/src/components/taglib/component-globals-tag.js"
  );
  return lookupInstance;
}
