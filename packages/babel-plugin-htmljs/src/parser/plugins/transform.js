import * as t from "../../definitions";

/**
 * Applies custom transformers on tags.
 */
export const visitor = {
  HTMLElement(path) {
    const {
      hub: { lookup },
      node
    } = path;
    const {
      startTag: { name }
    } = node;
    const tagName = name.value;

    // Ignore dynamic tags and @tags when transforming.
    if (!t.isStringLiteral(name) || tagName[0] === "@") {
      return;
    }

    const tagDef = (node.tagDef = lookup.getTag(tagName));

    if (!tagDef) {
      throw path.buildCodeFrameError(`Could not find custom tag "${tagName}".`);
    }

    const transformers = [
      ...Object.values(tagDef.transformers),
      ...Object.values(lookup.getTag("*").transformers)
    ].sort(comparePriority);

    for (const transformer of transformers) {
      const module = require(transformer.path);
      const { default: fn = module } = module;
      const node = path.node;
      fn(path);
      if (node !== path.node) break; // Stop if node is replaced.
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
