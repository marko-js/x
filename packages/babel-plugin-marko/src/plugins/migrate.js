import tagDefForPath from "../util/tagdef-for-path";
const MIGRATOR_CACHE = {};

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
  let tagName = path.get("name.value").node;

  let migrators = MIGRATOR_CACHE[tagName];

  if (!migrators) {
    const tagDef = tagDefForPath(path, true);

    migrators = MIGRATOR_CACHE[tagName] = [
      ...(tagDef ? tagDef.migratorPaths : []),
      ...lookup.getTag("*").migratorPaths
    ].map(path => require(path));
  }

  return migrators;
}
