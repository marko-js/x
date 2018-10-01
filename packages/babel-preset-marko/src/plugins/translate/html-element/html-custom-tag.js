import { relative, dirname } from "path";
import * as t from "../../../definitions";
import { replaceInRenderBody } from "../../../taglib/core/util";
import { getAttrs, buildEventHandlerArray } from "./util";

// TODO: support transform and other entries.
const TAG_FILE_ENTRIES = ["template", "renderer"];

export default function(path, tagDef) {
  const { hub, node } = path;
  const { filename, meta } = hub;
  const {
    startTag: { key },
    attributeTags
  } = node;
  const { name } = tagDef;
  const relativePath = resolveRelativePath(filename, tagDef);

  if (!meta.tags.includes(relativePath)) {
    meta.tags.push(relativePath);
  }

  if (!relativePath) {
    throw path.buildCodeFrameError(
      `Unable to find entry point for "${name}" tag.`
    );
  }

  const tagIdentifier = hub.importDefault(path, relativePath, name);

  replaceInRenderBody(
    path,
    t.callExpression(tagIdentifier, [
      getNestedAttrs(node, tagDef, attributeTags),
      t.identifier("out"),
      key,
      ...buildEventHandlerArray(path)
    ])
  );
}

function getNestedAttrs(node, tagDef) {
  const nestedTags = tagDef && tagDef.nestedTags;
  const { attributeTags } = node;
  const attrs = getAttrs(node);

  if (!attributeTags) {
    return attrs;
  }

  for (const [name, tagNodes] of Object.entries(attributeTags)) {
    const nestedTagDef = nestedTags && nestedTags[name];

    if (nestedTagDef && nestedTagDef.isRepeated) {
      const { targetProperty } = nestedTagDef;
      // TODO: repeated @tags
    } else {
      if (tagNodes.length > 1) {
        throw path.buildCodeFrameError(
          `Only one "@${name}" tag is allowed here.`
        );
      }

      attrs.properties.push(
        t.objectProperty(
          t.stringLiteral(name),
          getNestedAttrs(tagNodes[0], nestedTagDef)
        )
      );
    }
  }

  return attrs;
}

function resolveRelativePath(filename, tagDef) {
  const dir = dirname(filename);
  for (const entry of TAG_FILE_ENTRIES) {
    if (!tagDef[entry]) continue;
    let relativePath = relative(dir, tagDef[entry]);
    if (/^[^./]/.test(relativePath)) relativePath = `./${relativePath}`;
    return relativePath;
  }
}
