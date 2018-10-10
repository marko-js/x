import * as t from "../../../definitions";
import { getAttrs } from "./util";

const EMPTY_OBJECT = {};
const parentIdentifierLookup = new WeakMap();
const transparentTags = new Set([
  "for",
  "if",
  "else",
  "marko-preserve-whitespace"
]);

// TODO: test not root
// TODO: optimize inline repeated @tags.

export default function(path) {
  const { node, hub } = path;
  const { lookup } = hub;
  const tagName = node.startTag.name.value;
  const fullTagName = getFullyResolvedTagName(path);
  const parentPath = findParentTag(path);
  const parent = parentPath.node;
  parent.hasAttributeTag = node;

  if (!parent || !t.isHTMLElement(parent)) {
    throw path.buildCodeFrameError(
      `@tags must be nested within another element.`
    );
  }

  const parentStartTag = parent.startTag;
  const parentAttributes = parentStartTag.attributes;
  const tagDef = lookup.getTag(fullTagName) || EMPTY_OBJECT;
  const { isRepeated, targetProperty = tagName.slice(1) } = tagDef;
  const isDynamic = isRepeated || parent !== path.parent;
  parent.hasDynamicAttributeTags = isDynamic || node.hasDynamicAttributeTags;

  if (!isDynamic) {
    if (parentAttributes.some(attr => attr.name === targetProperty)) {
      throw path.buildCodeFrameError(
        `Only one "${tagName}" tag is allowed here.`
      );
    }

    parentAttributes.push(t.htmlAttribute(targetProperty, getAttrs(path)));

    path.remove();
    return;
  }

  let identifier = parentIdentifierLookup.get(parent);

  if (!identifier) {
    identifier = path.scope.generateUidIdentifier(targetProperty);
    parentIdentifierLookup.set(parent, identifier);

    appendNode(
      parentPath,
      t.variableDeclaration(isRepeated ? "const" : "let", [
        t.variableDeclarator(
          identifier,
          isRepeated ? t.arrayExpression([]) : t.nullLiteral()
        )
      ])
    );

    parentAttributes.push(t.htmlAttribute(targetProperty, identifier));
  }

  if (isRepeated) {
    path.replaceWith(
      t.callExpression(t.memberExpression(identifier, t.identifier("push")), [
        getAttrs(path)
      ])
    );
  } else {
    path.replaceWith(t.assignmentExpression("=", identifier, getAttrs(path)));
  }
}

function getFullyResolvedTagName(path) {
  const parts = [];
  let cur;
  do {
    cur = path.node.startTag.name.value;

    if (cur[0] !== "@") {
      parts.push(cur);
      break;
    }

    parts.push(cur.slice(1));
  } while ((path = findParentTag(path)));

  return parts.reverse().join(":");
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

    return cur;
  }
}

function appendNode(path, node) {
  path.node.children.unshift(node);
}
