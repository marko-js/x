import { NodePath, MarkoTag } from "@marko/babel-types";
import { getTagDef, isNativeTag } from "@marko/babel-utils";
import markoModules from "@marko/compiler/modules";
import analyzeTagName, { TagNameTypes } from "../util/analyze-tag-name";
import * as hooks from "../util/plugin-hooks";
import * as NativeTag from "./native-tag";
// import * as CustomTag from "./custom-tag";
// import * as DynamicTag from "./dynamic-tag";
// import * as AttributeTag from "./attribute-tag";

type CodeGeneratorTagDef = {
  codeGeneratorModulePath?: string;
  codeGenerator?: hooks.Plugin;
};

export function enter(path: NodePath<MarkoTag>) {
  const tagDef = getTagDef(path) as CodeGeneratorTagDef | undefined;

  if (tagDef) {
    if (tagDef.codeGeneratorModulePath) {
      (path.hub.file.metadata.watchFiles as string[]).push(
        tagDef.codeGeneratorModulePath
      );

      if (
        hooks.enter(
          (tagDef.codeGenerator = markoModules.require(
            tagDef.codeGeneratorModulePath
          )),
          path
        )
      ) {
        return;
      }
    }
  }

  for (const attr of path.get("attributes")) {
    if (attr.isMarkoAttribute()) {
      if (attr.node.arguments) {
        throw attr.buildCodeFrameError(
          `Unsupported arguments on the "${attr.node.name}" attribute.`
        );
      }

      if (attr.node.modifier) {
        if (isNativeTag(attr.parentPath as NodePath<MarkoTag>)) {
          attr.node.name += `:${attr.node.modifier}`;
        } else {
          throw attr.buildCodeFrameError(
            `Unsupported modifier "${attr.node.modifier}".`
          );
        }
      }
    }
  }

  switch (analyzeTagName(path).type) {
    case TagNameTypes.NativeTag:
      NativeTag.enter(path);
      break;
    // case TagNameTypes.CustomTag:
    //   CustomTag.enter(path);
    //   break;
    // case TagNameTypes.DynamicTag:
    //   DynamicTag.enter(path);
    //   break;
    // case TagNameTypes.AttributeTag:
    //   AttributeTag.enter(path);
    //   break;
  }
}

export function exit(path: NodePath<MarkoTag>) {
  if (
    hooks.exit(
      (getTagDef(path) as CodeGeneratorTagDef | undefined)?.codeGenerator,
      path
    )
  ) {
    return;
  }

  switch (analyzeTagName(path).type) {
    case TagNameTypes.NativeTag:
      NativeTag.exit(path);
      break;
    // case TagNameTypes.CustomTag:
    //   CustomTag.exit(path);
    //   break;
    // case TagNameTypes.DynamicTag:
    //   DynamicTag.exit(path);
    //   break;
    // case TagNameTypes.AttributeTag:
    //   AttributeTag.exit(path);
    //   break;
  }
}
