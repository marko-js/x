import path from "path";
import { loader, finder } from "marko/src/taglib";
import TaglibLookup from "marko/src/taglib/taglib-lookup/TaglibLookup";

const lookupCache = Object.create(null);
const coreTaglibs = ["html", "svg"].map(name =>
  loader.loadTaglibFromFile(path.join(__dirname, name, "marko.json"))
);

export function buildLookup(dirname, translatorTaglibs) {
  const taglibsForDir = finder.find(
    dirname,
    coreTaglibs.concat(translatorTaglibs)
  );

  const cacheKey = taglibsForDir.map(it => it.id).join();
  let lookup = lookupCache[cacheKey];

  if (!lookup) {
    lookup = lookupCache[cacheKey] = new TaglibLookup();
    for (const taglib of taglibsForDir) {
      lookup.addTaglib(taglib);
      if (taglib.imports) {
        for (const importedTaglib of taglib.imports) {
          if (!lookup.hasTaglib(importedTaglib)) {
            lookup.addTaglib(importedTaglib);
          }
        }
      }
    }
  }

  return lookup;
}
