import { getFullyResolvedTagName } from "../plugins/translate/tag/util";

export default path => {
  const { hub } = path;
  const { lookup, macros } = hub;
  let tagName = path.get("name.value").node;
  const isDynamicTag = !path.get("name").isStringLiteral();
  const isAttributeTag = !isDynamicTag && tagName[0] === "@";

  if (macros[tagName]) {
    return;
  }

  if (isDynamicTag) {
    tagName = undefined;
  } else if (isAttributeTag && path.parentPath.isMarkoTag()) {
    tagName = getFullyResolvedTagName(path);
  }

  const tagDef = tagName && lookup.getTag(tagName);

  return tagDef;
};
