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

  assertNoArgs(path);

  if (!parentPath) {
    throw namePath.buildCodeFrameError(
      "@tags must be nested within another element."
    );
  }

  if (node.bodyOnlyIf) {
    throw namePath.buildCodeFrameError(
      `@tags do not support the "body-only-if" attribute.`
    );
  }

  const parentAttributes = parentPath.get("attributes");
  const tagDef = lookup.getTag(fullTagName) || EMPTY_OBJECT;
  const { isRepeated, targetProperty = tagName.slice(1) } = tagDef;
  const isDynamic = isRepeated || parentPath !== path.parentPath;
  parentPath.node.hasAttributeTag = node;
  parentPath.node.hasDynamicAttributeTags =
    isDynamic || node.hasDynamicAttributeTags;

  if (!isDynamic) {
    if (
      parentAttributes.some(attr => attr.get("name").node === targetProperty)
    ) {
      throw namePath.buildCodeFrameError(
        `Only one "${tagName}" tag is allowed here.`
      );
    }

    parentPath.pushContainer(
      "attributes",
      t.markoAttribute(targetProperty, getAttrs(path))
    );
    path.remove();
    return;
  }

  let identifier = parentIdentifierLookup.get(parentPath);

  if (!identifier) {
    identifier = path.scope.generateUidIdentifier(targetProperty);
    parentIdentifierLookup.set(parentPath, identifier);
    parentPath.unshiftContainer(
      "body",
      t.variableDeclaration(isRepeated ? "const" : "let", [
        t.variableDeclarator(
          identifier,
          isRepeated ? t.arrayExpression([]) : t.nullLiteral()
        )
      ])
    );
    parentPath.pushContainer(
      "attributes",
      t.markoAttribute(targetProperty, identifier)
    );
  }

  if (isRepeated) {
    path.replaceWith(
      t.expressionStatement(
        t.callExpression(t.memberExpression(identifier, t.identifier("push")), [
          getAttrs(path)
        ])
      )
    );
  } else {
    path.replaceWith(
      t.expressionStatement(
        t.assignmentExpression("=", identifier, getAttrs(path))
      )
    );
  }
}

function getFullyResolvedTagName(path) {
  const parts = [];
  let cur;
  do {
    cur = path.node.name.value;

    if (cur) {
      if (cur[0] !== "@") {
        parts.push(cur);
      } else {
        parts.push(cur.slice(1));
        continue;
      }
    }

    break;
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

    if (transparentTags.has(node.name.value)) {
      cur = cur.parentPath;
      continue;
    }

    return cur;
  }
}
