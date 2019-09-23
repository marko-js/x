import { getFullyResolvedTagName } from "@marko/babel-utils";
import dynamicTag from "./dynamic-tag";
import attributeTag from "./attribute-tag";
import nativeTagHTML from "./native-tag[html]";
import nativeTagVDOM from "./native-tag[vdom]";
import customTag from "./custom-tag";
import macroTag from "./macro-tag";

const EMPTY_OBJECT = {};

export default {
  enter(path) {
    const { hub } = path;
    const { macros } = hub;
    const name = path.get("name");
    const tagName = name.get("value").node;
    const canHaveTagDef = name.isStringLiteral() && !macros[tagName];
    const tagDef =
      (canHaveTagDef && hub.lookup.getTag(getFullyResolvedTagName(path))) ||
      EMPTY_OBJECT;

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

    path.set("tagDef", tagDef);
  },
  exit(path) {
    const { hub } = path;
    const { macros, options } = hub;
    const name = path.get("name");

    if (!name.isStringLiteral()) {
      dynamicTag(path);
      return;
    }

    const tagName = name.get("value").node;
    const isAttributeTag = tagName[0] === "@";

    if (isAttributeTag) {
      attributeTag(path);
      return;
    }

    if (macros[tagName]) {
      assertNoAttributeTags();
      macroTag(path, macros[tagName]);
      return;
    }

    const tagDef = path.get("tagDef").node;
    const { codeGenerator } = tagDef;

    if (codeGenerator && codeGenerator.exit) {
      const { node } = path;
      tagDef.codeGenerator.exit(path);
      if (path.node !== node) {
        return;
      }
    }

    if (tagDef.html) {
      assertNoAttributeTags();
      if (options.output === "html") {
        nativeTagHTML(path);
      } else {
        nativeTagVDOM(path);
      }

      return;
    }

    customTag(path, tagDef);

    function assertNoAttributeTags() {
      const exampleAttributeTag = path.get("exampleAttributeTag");
      if (exampleAttributeTag.node) {
        throw exampleAttributeTag
          .get("name")
          .buildCodeFrameError("@tags must be within a custom element.");
      }
    }
  }
};
