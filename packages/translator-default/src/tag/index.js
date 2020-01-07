import {
  getTagDef,
  isDynamicTag,
  isAttributeTag,
  isMacro,
  isHTMLTag
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

      if (isHTMLTag(path)) {
        return nativeTag(path);
      }
    }

    customTag(path, tagDef);
  }
};
