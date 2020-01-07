import { types as t } from "@marko/babel-types";
import {
  getTagDef,
  isDynamicTag,
  isAttributeTag,
  isMacro,
  isNativeTag,
  findAttributeTags
} from "@marko/babel-utils";
import nativeTag from "./native-tag";
import dynamicTag from "./dynamic-tag";
import attributeTag from "./attribute-tag";
import customTag from "./custom-tag";
import macroTag from "./macro-tag";
import { getKeyManager } from "../util/key-manager";

export default {
  enter(path) {
    const tagDef = getTagDef(path);

    if (tagDef) {
      if (tagDef.codeGeneratorModulePath) {
        tagDef.codeGenerator = require(tagDef.codeGeneratorModulePath);
      }

      if (tagDef.codeGenerator && tagDef.codeGenerator.enter) {
        const { node } = path;
        tagDef.codeGenerator.enter(path);
        if (path.node !== node) {
          return;
        }
      }
    } else {
      if (path.hub.options.ignoreUnrecognizedTags) {
        findAttributeTags(path).forEach(child => {
          child.set(
            "name",
            t.stringLiteral(`at_${child.get("name.value").node.slice(1)}`)
          );
        });
      }
    }

    getKeyManager(path).resolveKey(path);
  },
  exit(path) {
    if (isDynamicTag(path)) {
      return dynamicTag(path);
    }

    if (isAttributeTag(path)) {
      return attributeTag(path);
    }

    if (isMacro(path)) {
      return macroTag(path);
    }

    const tagDef = getTagDef(path);

    if (tagDef) {
      const { codeGenerator } = tagDef;

      if (codeGenerator && codeGenerator.exit) {
        const { node } = path;
        tagDef.codeGenerator.exit(path);
        if (path.node !== node) {
          return;
        }
      }

      if (isNativeTag(path)) {
        return nativeTag(path);
      }
    }

    customTag(path);
  }
};
