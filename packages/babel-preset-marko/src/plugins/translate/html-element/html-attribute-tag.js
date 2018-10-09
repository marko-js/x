import * as t from "../../../definitions";

const transparentTags = new Set([
  "for",
  "if",
  "else",
  "marko-preserve-whitespace"
]);

export default function(path) {
  const { node } = path;
  const { startTag } = node;
  const tagName = startTag.name.value.slice(1);
  const parent = findParentTag(path);

  if (!parent || !t.isHTMLElement(parent)) {
    throw path.buildCodeFrameError(
      `@tags must be nested within another element.`
    );
  }

  if (parent !== path.parent) {
    throw path.buildCodeFrameError(`TODO: dynamic @tags.`);
  }

  const tags = (parent.attributeTags = parent.attributeTags || {});
  const tag = (tags[tagName] = tags[tagName] || []);
  tag.push(node);
  path.remove();
}

function findParentTag(path) {
  let cur = path.parentPath;

  while (cur.node) {
    const { node } = cur;

    if (!t.isHTMLElement(node)) {
      cur = undefined;
      break;
    }

    const tagName = node.startTag.name;
    if (!t.isStringLiteral(tagName)) {
      cur = undefined;
      break;
    }

    if (transparentTags.has(tagName.value)) {
      cur = cur.parentPath;
      continue;
    }

    return node;
  }
}
