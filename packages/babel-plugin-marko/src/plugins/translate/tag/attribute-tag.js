import * as t from "../../../definitions";
import { getAttrs } from "./util";
import { assertNoArgs } from "../../../taglib/core/util";

const EMPTY_OBJECT = {};
const parentIdentifierLookup = new WeakMap();
const transparentTags = new Set(["for", "if", "else", "no-update"]);

// TODO: optimize inline repeated @tags.

export default function(path) {
  const { node, hub } = path;
  const { lookup } = hub;
  const namePath = path.get("name");
  const tagName = namePath.node.value;
  const fullTagName = getFullyResolvedTagName(path);
  const parentPath = findParentTag(path);
  const parent = parentPath && parentPath.node;

  assertNoArgs(path);

  if (!parent || !t.isMarkoTag(parent)) {
    throw namePath.buildCodeFrameError(
      "@tags must be nested within another element."
    );
  }

  if (node.bodyOnlyIf) {
    throw namePath.buildCodeFrameError(
      `@tags do not support the "body-only-if" attribute.`
    );
  }

  parent.hasAttributeTag = node;
  const parentAttributes = parent.attributes;
  const tagDef = lookup.getTag(fullTagName) || EMPTY_OBJECT;
  const { isRepeated, targetProperty = tagName.slice(1) } = tagDef;
  const isDynamic = isRepeated || parent !== path.parent;
  parent.hasDynamicAttributeTags = isDynamic || node.hasDynamicAttributeTags;

  if (!isDynamic) {
    if (parentAttributes.some(attr => attr.name === targetProperty)) {
      throw namePath.buildCodeFrameError(
        `Only one "${tagName}" tag is allowed here.`
      );
    }

    parentAttributes.push(t.markoAttribute(targetProperty, getAttrs(path)));

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

    parentAttributes.push(t.markoAttribute(targetProperty, identifier));
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
    cur = path.node.name.value;

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

    if (!t.isMarkoTag(node)) {
      cur = undefined;
      break;
    }

    const tagName = node.name;
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
  path.node.body.unshift(node);
}
