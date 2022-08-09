import { types as t } from "@marko/compiler";
import {
  getTagDef,
  importNamed,
  importDefault,
  resolveRelativePath,
  loadFileForTag,
} from "@marko/babel-utils";
import attrsToObject, { getRenderBodyProp } from "../../util/attrs-to-object";
import translateVar from "../../util/translate-var";
import * as writer from "../../util/writer";
import * as walks from "../../util/walks";
import { isOutputHTML } from "../../util/marko-config";
import { callRuntime, callRead } from "../../util/runtime";
import {
  startSection,
  getSectionId,
  getOrCreateSectionId,
} from "../../util/sections";
import trackReferences, {
  mergeReferenceGroups,
  ReferenceGroup,
} from "../../util/references";
import {
  addStatement,
  getSignal,
  writeHTMLHydrateStatements,
} from "../../util/apply-hydrate";
import { reserveScope, ReserveType } from "../../util/reserve";
import { currentProgramPath } from "../program";

declare module "@marko/compiler/dist/types" {
  export interface ProgramExtra {
    hasInteractiveChild?: boolean;
  }
}

export default {
  analyze: {
    enter(tag: t.NodePath<t.MarkoTag>) {
      trackReferences(tag);

      const body = tag.get("body");
      if (body.get("body").length) {
        startSection(body);
      }

      if (getTagDef(tag)?.template) {
        reserveScope(
          ReserveType.Store,
          getOrCreateSectionId(tag),
          tag.node,
          "child"
        );
      }

      const childFile = loadFileForTag(tag)!;
      const childProgramExtra = childFile?.ast.program.extra;
      const hasInteractiveChild =
        childProgramExtra?.isInteractive ||
        childProgramExtra?.hasInteractiveChild;

      if (hasInteractiveChild) {
        (currentProgramPath.node.extra ?? {}).hasInteractiveChild = true;
      }
    },
    exit(tag: t.NodePath<t.MarkoTag>) {
      // TODO: only if dynamic attributes
      const tagDef = getTagDef(tag);
      const template = tagDef?.template;
      const sectionId = getOrCreateSectionId(tag);
      if (template) {
        tag.node.extra.attrsReferences = mergeReferenceGroups(
          sectionId,
          tag.node.attributes
            .filter((attr) => attr.extra?.valueReferences)
            .map((attr) => [attr.extra, "valueReferences"])
        );
      }
    },
  },
  translate: {
    enter(tag: t.NodePath<t.MarkoTag>) {
      walks.visit(tag);
      if (isOutputHTML()) {
        writer.flushBefore(tag);
      }
    },
    exit(tag: t.NodePath<t.MarkoTag>) {
      const tagSectionId = getSectionId(tag);
      const tagBody = tag.get("body");
      const tagBodySectionId = getSectionId(tagBody);
      const isHTML = isOutputHTML();
      const { node } = tag;
      const write = writer.writeTo(tag);
      const binding = node.extra.reserve!;
      let tagIdentifier: t.Expression;
      let tagAttrsIdentifier: t.Identifier | undefined;

      if (isHTML) {
        writer.flushInto(tag);
        writeHTMLHydrateStatements(tagBody);
      }

      if (t.isStringLiteral(node.name)) {
        const { file } = tag.hub;
        const tagName = node.name.value;
        const tags = file.metadata.marko.tags;
        const tagDef = getTagDef(tag);
        const template = tagDef?.template;
        const relativePath = template && resolveRelativePath(file, template);
        const childFile = loadFileForTag(tag)!;
        const childProgram = childFile.ast.program;

        if (!relativePath) {
          throw tag
            .get("name")
            .buildCodeFrameError(
              `Unable to find entry point for custom tag <${tagName}>.`
            );
        }

        if (isHTML) {
          tagIdentifier = importDefault(file, relativePath, tagName);
        } else {
          tagIdentifier = importNamed(file, relativePath, "setup", tagName);
          if (childProgram.extra.attrs) {
            tagAttrsIdentifier = importNamed(
              file,
              relativePath,
              "attrs",
              `${tagName}_attrs`
            );
          }
          write`${importNamed(
            file,
            relativePath,
            "template",
            `${tagName}_template`
          )}`;
          walks.injectWalks(
            tag,
            binding.id,
            importNamed(file, relativePath, "walks", `${tagName}_walks`)
          );
        }

        if (!tags.includes(relativePath)) {
          tags.push(relativePath);
        }
      } else {
        tagIdentifier = node.name;
      }

      const tagVar = node.var;
      const attrsObject = attrsToObject(tag, true);
      const renderBodyProp = getRenderBodyProp(attrsObject);

      if (isHTML && node.extra.tagNameNullable) {
        let renderBodyId: t.Identifier | undefined = undefined;
        let renderTagExpr: t.Expression = callExpression(
          tagIdentifier,
          attrsToObject(tag)
        );

        if (renderBodyProp) {
          renderBodyId = tag.scope.generateUidIdentifier("renderBody");
          const [renderBodyPath] = tag.insertBefore(
            t.functionDeclaration(
              renderBodyId,
              renderBodyProp.params,
              renderBodyProp.body
            )
          );

          renderBodyPath.skip();

          (attrsObject as t.ObjectExpression).properties[
            (attrsObject as t.ObjectExpression).properties.length - 1
          ] = t.objectProperty(t.identifier("renderBody"), renderBodyId);
        }

        if (tagVar) {
          translateVar(
            tag,
            t.unaryExpression("void", t.numericLiteral(0)),
            "let"
          );
          renderTagExpr = t.assignmentExpression("=", tagVar, renderTagExpr);
        }

        tag
          .replaceWith(
            t.ifStatement(
              tagIdentifier,
              t.expressionStatement(renderTagExpr),
              renderBodyId && callStatement(renderBodyId)
            )
          )[0]
          .skip();
      } else {
        if (isHTML) {
          if (tagVar) {
            translateVar(tag, callExpression(tagIdentifier, attrsObject));
            tag.remove();
          } else {
            tag
              .replaceWith(callStatement(tagIdentifier, attrsObject))[0]
              .skip();
          }
        } else {
          if (renderBodyProp) {
            const { walks, writes } = writer.getSectionMeta(tagBodySectionId);
            (attrsObject as t.ObjectExpression).properties.pop();
            (attrsObject as t.ObjectExpression).properties.push(
              t.objectProperty(
                t.identifier("renderBody"),
                callRuntime(
                  "createRenderer",
                  writes || t.stringLiteral(""),
                  walks || t.stringLiteral(""),
                  t.arrowFunctionExpression(
                    renderBodyProp.params,
                    renderBodyProp.body
                  )
                )
              )
            );
          }
          addStatement(
            "apply",
            tagSectionId,
            undefined,
            t.expressionStatement(
              t.callExpression(tagIdentifier, [callRead(binding, tagSectionId)])
            )
          );
          if (attrsObject && tagAttrsIdentifier) {
            getSignal(
              tagSectionId,
              (tag.node.extra.attrsReferences as ReferenceGroup).references
            ).subscribers.push(tagAttrsIdentifier);
            addStatement(
              "apply",
              tagSectionId,
              tag.node.extra.attrsReferences as ReferenceGroup,
              t.expressionStatement(
                callRuntime(
                  "setSource",
                  callRead(binding, tagSectionId),
                  t.identifier(tagAttrsIdentifier.name),
                  attrsObject
                )
              )
            );
          }
          tag.remove();
        }
      }
    },
  },
};

function callStatement(
  id: t.Expression,
  ...args: Array<t.Expression | undefined>
) {
  return t.expressionStatement(callExpression(id, ...args));
}

function callExpression(
  id: t.Expression,
  ...args: Array<t.Expression | undefined>
) {
  return t.callExpression(id, args.filter(Boolean) as t.Expression[]);
}
