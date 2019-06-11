import fs from "fs";
import path from "path";
import resolveFrom from "resolve-from";
import { loader, lookup } from "marko/src/taglib";

["core", "html", "svg"].forEach(name => {
  const file = path.join(__dirname, name, "marko.json");
  const lib = loader.createTaglib(file);
  loader.loadTaglibFromProps(lib, JSON.parse(fs.readFileSync(file, "utf-8")));
  lookup.registerTaglib(lib);
});

export function buildLookup(dirname) {
  // create lookup and load specific tags from old compiler.
  const lookupInstance = lookup.buildLookup(dirname);

  lookupInstance.getTag("await").renderer = resolveFrom(
    dirname,
    "marko/src/core-tags/core/await/renderer.js"
  );

  lookupInstance.getTag("await-reorderer").renderer = resolveFrom(
    dirname,
    "marko/src/core-tags/core/await/reorderer-renderer.js"
  );

  lookupInstance.getTag("no-update").renderer = resolveFrom(
    dirname,
    "marko/src/core-tags/components/preserve-tag.js"
  );

  lookupInstance.getTag("init-components").renderer = resolveFrom(
    dirname,
    "marko/src/core-tags/components/init-components-tag.js"
  );

  lookupInstance.getTag("component-globals").renderer = resolveFrom(
    dirname,
    "marko/src/core-tags/components/component-globals-tag.js"
  );
  return lookupInstance;
}
