import { types as t, NodePath } from "@marko/babel-types";
import { assertNoArgs, getTagDef, isNativeTag } from "@marko/babel-utils";
import markoModules from "@marko/compiler/modules";
import analyzeTagName, { TagNameTypes } from "../util/analyze-tag-name";
import * as hooks from "../util/plugin-hooks";
import * as NativeTag from "./native-tag";
import * as CustomTag from "./custom-tag";
// import * as DynamicTag from "./dynamic-tag";
// import * as AttributeTag from "./attribute-tag";

type CodeGeneratorTagDef = {
  codeGeneratorModulePath?: string;
  codeGenerator?: hooks.Plugin;
};

export function enter(tag: NodePath<t.MarkoTag>) {
  const tagDef = getTagDef(tag) as CodeGeneratorTagDef | undefined;

  assertNoArgs(tag);

  if (tagDef) {
    if (tagDef.codeGeneratorModulePath) {
      (tag.hub.file.metadata.watchFiles as string[]).push(
        tagDef.codeGeneratorModulePath
      );

      if (
        hooks.enter(
          (tagDef.codeGenerator = markoModules.require(
            tagDef.codeGeneratorModulePath
          )),
          tag
        )
      ) {
        return;
      }
    }
  }

  for (const attr of tag.get("attributes")) {
    if (attr.isMarkoAttribute()) {
      if (attr.node.arguments) {
        throw attr.buildCodeFrameError(
          `Unsupported arguments on the "${attr.node.name}" attribute.`
        );
      }

      if (attr.node.modifier) {
        if (isNativeTag(attr.parentPath as NodePath<t.MarkoTag>)) {
          attr.node.name += `:${attr.node.modifier}`;
        } else {
          throw attr.buildCodeFrameError(
            `Unsupported modifier "${attr.node.modifier}".`
          );
        }
      }
    }
  }

  const analyzed = analyzeTagName(tag);

  if (analyzed.dynamic && analyzed.nullable) {
    if (!tag.get("name").isIdentifier()) {
      const tagNameId = tag.scope.generateDeclaredUidIdentifier("tagName");

      tag.scope.registerDeclaration(
        tag.insertBefore(
          t.variableDeclaration("const", [
            t.variableDeclarator(tagNameId, tag.node.name)
          ])
        )[0] as NodePath<t.Node>
      );

      tag.set("name", tagNameId);
    }
  }

  switch (analyzed.type) {
    case TagNameTypes.NativeTag:
      NativeTag.enter(tag);
      break;
    case TagNameTypes.CustomTag:
      CustomTag.enter(tag);
      break;
    // case TagNameTypes.DynamicTag:
    //   DynamicTag.enter(tag);
    //   break;
    // case TagNameTypes.AttributeTag:
    //   AttributeTag.enter(tag);
    //   break;
  }
}

export function exit(tag: NodePath<t.MarkoTag>) {
  if (
    hooks.exit(
      (getTagDef(tag) as CodeGeneratorTagDef | undefined)?.codeGenerator,
      tag
    )
  ) {
    return;
  }

  switch (analyzeTagName(tag).type) {
    case TagNameTypes.NativeTag:
      NativeTag.exit(tag);
      break;
    case TagNameTypes.CustomTag:
      CustomTag.exit(tag);
      break;
    // case TagNameTypes.DynamicTag:
    //   DynamicTag.exit(tag);
    //   break;
    // case TagNameTypes.AttributeTag:
    //   AttributeTag.exit(tag);
    //   break;
  }
}
