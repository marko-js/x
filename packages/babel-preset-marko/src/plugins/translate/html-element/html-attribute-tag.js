import * as t from "../../../definitions";

export default function(path) {
  const { parent, node } = path;
  const { startTag } = node;
  const tagName = startTag.name.value.slice(1);

  if (!t.isHTMLElement(parent)) {
    throw path.buildCodeFrameError(
      `@tags must be nested within another element.`
    );
  }

  const tags = (parent.attributeTags = parent.attributeTags || {});
  const tag = (tags[tagName] = tags[tagName] || []);
  tag.push(node);
  path.remove();
}
