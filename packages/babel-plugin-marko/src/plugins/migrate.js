import tagDefForPath from "../util/tagdef-for-path";

/**
 * Applies custom migrators on tags.
 */
export const visitor = {
  MarkoTag: {
    enter(path) {
      const migrators = getMigratorsForTag(path);
      for (const migrator of migrators) {
        if (migrator.enter) {
          const { node } = path;
          migrator.enter(path);
          if (path.node !== node) break; // Stop if node is replaced.
        }
      }
    },
    exit(path) {
      const migrators = getMigratorsForTag(path);
      for (const migrator of migrators) {
        if (migrator.exit) {
          const { node } = path;
          migrator.exit(path);
          if (path.node !== node) break; // Stop if node is replaced.
        }
      }
    }
  }
};

function getMigratorsForTag(path) {
  const { hub } = path;
  const { lookup } = hub;
  const tagName = path.get("name.value").node;
  const MIGRATOR_CACHE = (lookup.MIGRATOR_CACHE = lookup.MIGRATOR_CACHE || {});

  let migrators = MIGRATOR_CACHE[tagName];

  if (!migrators) {
    const tagDef = tagDefForPath(path);

    migrators = MIGRATOR_CACHE[tagName] = [
      ...(tagDef ? tagDef.migratorPaths : []),
      ...lookup.getTag("*").migratorPaths
    ].map(path => require(path));
  }

  return migrators;
}
