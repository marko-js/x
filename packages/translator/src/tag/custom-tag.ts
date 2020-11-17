import { types as t, NodePath } from "@marko/babel-types";
import {
  getTagDef,
  importDefault,
  resolveRelativePath
} from "@marko/babel-utils";
import attrsToObject from "../util/attrs-to-object";
import addRenderBodyAttr from "../util/add-render-body-attr";
import { flushHTML } from "../util/html-flush";
import analyzeTagName from "../util/analyze-tag-name";

export function enter(tag: NodePath<t.MarkoTag>) {
  flushHTML(tag, it => tag.insertBefore(it));
}

export function exit(tag: NodePath<t.MarkoTag>) {
  const { node } = tag;
  let tagIdentifier: t.Expression;

  flushHTML(tag, it => tag.get("body").pushContainer("body", it));

  if (t.isStringLiteral(node.name)) {
    const { file } = tag.hub;
    const tagName = node.name.value;
    const tags = file.metadata.marko.tags;
    const tagDef = getTagDef(tag) as { template?: string } | undefined;
    const template = tagDef?.template;
    const relativePath = template && resolveRelativePath(file, template);

    if (!relativePath) {
      throw tag
        .get("name")
        .buildCodeFrameError(
          `Unable to find entry point for custom tag <${tagName}>.`
        );
    }

    tagIdentifier = importDefault(file, relativePath, tagName);

    if (!tags.includes(relativePath)) {
      tags.push(relativePath);
    }
  } else {
    tagIdentifier = node.name;
  }

  const renderBodyAttr = addRenderBodyAttr(tag);

  if (analyzeTagName(tag).nullable) {
    let renderBodyId: t.Identifier | undefined = undefined;

    if (renderBodyAttr) {
      renderBodyId = tag.scope.generateDeclaredUidIdentifier("renderBody");

      tag.scope.registerDeclaration(
        tag.insertBefore(
          t.variableDeclaration("const", [
            t.variableDeclarator(renderBodyId, renderBodyAttr.node.value)
          ])
        )[0] as NodePath<t.Node>
      );

      renderBodyAttr.set("value", renderBodyId);
    }

    tag.replaceWith(
      t.ifStatement(
        tagIdentifier,
        callStatement(tagIdentifier, attrsToObject(tag)),
        renderBodyId && callStatement(renderBodyId)
      )
    );
  } else {
    tag.replaceWith(callStatement(tagIdentifier, attrsToObject(tag)));
  }
}

function callStatement(
  id: Parameters<typeof t.callExpression>[0],
  ...args: Parameters<typeof t.callExpression>[1]
) {
  return t.expressionStatement(t.callExpression(id, args.filter(Boolean)));
}
