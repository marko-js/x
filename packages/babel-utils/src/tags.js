import { types as t } from "@marko/babel-types";
const transparentTags = new Set(["for", "while", "if", "else", "no-update"]);

export function isHTMLTag(path) {
  const tagDef = path.node.tagDef;
  return tagDef && tagDef.html;
}

export function isDynamicTag(path) {
  return !path.get("name").isStringLiteral();
}

export function isAttributeTag(path) {
  return !isDynamicTag(path) && path.get("name.value").node[0] === "@";
}

export function isMacro(path) {
  return Boolean(getMacro(path));
}

export function getMacro(path) {
  return path.hub.macros[path.get("name.value").node];
}

export function getTagDef(path) {
  const cached = path.get("tagDef");

  if (cached.node !== undefined) {
    return cached.node;
  }

  const { hub } = path;
  const { lookup } = hub;
  let tagName;

  if (!(isMacro(path) || isDynamicTag(path))) {
    tagName = isAttributeTag(path)
      ? getFullyResolvedTagName(path)
      : path.get("name.value").node;
  }

  const tagDef = (tagName && lookup.getTag(tagName)) || null;
  path.set("tagDef", tagDef);
  return tagDef;
}

export function getFullyResolvedTagName(path) {
  const parts = [];
  let cur;
  do {
    cur = path.node.name.value;

    if (isAttributeTag(path)) {
      parts.push(cur.slice(1));
    } else {
      parts.push(cur || "*");
      break;
    }
  } while ((path = findParentTag(path)));

  return parts.reverse().join(":");
}

export function findParentTag(path) {
  let cur = path.parentPath;

  while (cur.node) {
    if (cur.isMarkoTagBody()) {
      cur = cur.parentPath;
      continue;
    }

    if (!cur.isMarkoTag()) {
      cur = undefined;
      break;
    }

    if (transparentTags.has(cur.get("name.value").node)) {
      cur = cur.parentPath;
      continue;
    }

    return cur;
  }
}

export function getArgOrSequence(path) {
  const {
    node: { arguments: args }
  } = path;
  const len = args && args.length;

  if (len) {
    if (len > 1) {
      return t.sequenceExpression(args);
    } else {
      return args[0];
    }
  }
}
