/**
 * Applies custom transformers on tags.
 */
export const visitor = {
  Program(path) {
    path.hub._componentDefIdentifier = path.scope.generateUidIdentifier(
      "component"
    );
  },
  MarkoTag(path) {
    const { hub } = path;
    const { lookup, macros } = hub;
    let tagName = path.get("name.value").node;
    const isDynamicTag = !path.get("name").isStringLiteral();
    const isAttributeTag = !isDynamicTag && tagName[0] === "@";
    const isTagDefOptional = isDynamicTag || isAttributeTag;

    if (macros[tagName]) {
      return;
    }

    if (isDynamicTag) {
      tagName = undefined;
    } else if (isAttributeTag && path.parentPath.isMarkoTag()) {
      // TODO: need to account for transparent parents
      tagName = `${path.parent.name.value}:${tagName.slice(1)}`;
    }

    const tagDef = tagName && lookup.getTag(tagName);

    if (!isTagDefOptional && !tagDef) {
      throw path
        .get("name")
        .buildCodeFrameError(`Could not find custom tag "${tagName}".`);
    }

    const transformers = [
      ...(tagDef ? Object.values(tagDef.transformers) : []),
      ...Object.values(lookup.getTag("*").transformers)
    ].sort(comparePriority);

    for (const transformer of transformers) {
      const module = require(transformer.path);
      const { default: fn = module } = module;
      const node = path.node;
      fn(path);
      if (path.node !== node) break; // Stop if node is replaced.
    }
  }
};

function comparePriority(a, b) {
  a = a.priority;
  b = b.priority;

  if (a == null) {
    a = Number.MAX_VALUE;
  }

  if (b == null) {
    b = Number.MAX_VALUE;
  }

  return a - b;
}
