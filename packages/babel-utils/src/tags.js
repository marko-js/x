import { types as t } from "@marko/babel-types";
const transparentTags = new Set(["for", "while", "if", "else", "no-update"]);

export function getTagDef(path) {
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
  } else if (isAttributeTag) {
    tagName = getFullyResolvedTagName(path);
  }

  return tagName && lookup.getTag(tagName);
}

export function getFullyResolvedTagName(path) {
  const parts = [];
  let cur;
  do {
    cur = path.node.name.value || "*";

    if (cur[0] === "@") {
      parts.push(cur.slice(1));
    } else {
      parts.push(cur);
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
