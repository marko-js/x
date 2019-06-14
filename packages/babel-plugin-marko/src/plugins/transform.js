import { getFullyResolvedTagName } from "./translate/tag/util";
const TRANSFORMER_CACHE = {};

/**
 * Applies custom transformers on tags.
 */
export const visitor = {
  Program(path) {
    path.hub._componentDefIdentifier = path.scope.generateUidIdentifier(
      "component"
    );
  },
  MarkoTag: {
    enter(path) {
      const transformers = getTransformersForTag(path);
      for (const transformer of transformers) {
        if (transformer.enter) {
          const { node } = path;
          transformer.enter(path);
          if (path.node !== node) break; // Stop if node is replaced.
        }
      }
    },
    exit(path) {
      const transformers = getTransformersForTag(path);
      for (const transformer of transformers) {
        if (transformer.exit) {
          const { node } = path;
          transformer.exit(path);
          if (path.node !== node) break; // Stop if node is replaced.
        }
      }
    }
  }
};

function getTransformersForTag(path) {
  const { hub } = path;
  const { lookup, macros } = hub;
  let tagName = path.get("name.value").node;
  const isDynamicTag = !path.get("name").isStringLiteral();
  const isAttributeTag = !isDynamicTag && tagName[0] === "@";

  if (macros[tagName] || isDynamicTag) {
    return [];
  }

  if (isAttributeTag && path.parentPath.isMarkoTag()) {
    tagName = getFullyResolvedTagName(path);
  }

  let transformers = TRANSFORMER_CACHE[tagName];

  if (!transformers) {
    const tagDef = lookup.getTag(tagName);

    if (!isAttributeTag && !tagDef) {
      throw path
        .get("name")
        .buildCodeFrameError(
          `Could not find definition for the "<${tagName}>" tag.`
        );
    }

    transformers = TRANSFORMER_CACHE[tagName] = [
      ...(tagDef ? Object.values(tagDef.transformers) : []),
      ...Object.values(lookup.getTag("*").transformers)
    ]
      .sort(comparePriority)
      .map(({ path }) => require(path));
  }

  return transformers;
}

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
