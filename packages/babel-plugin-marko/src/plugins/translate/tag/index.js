import dynamicTag from "./dynamic-tag";
import attributeTag from "./attribute-tag";
import nativeTagHTML from "./native-tag[html]";
import nativeTagVDOM from "./native-tag[vdom]";
import customTag from "./custom-tag";
import macroTag from "./macro-tag";

const EMPTY_OBJECT = {};

export default {
  exit(path) {
    const { hub } = path;
    const { options, macros } = hub;
    const name = path.get("name");

    if (!path.get("key").node) {
      path.set("key", hub.nextKey());
    }

    if (!name.isStringLiteral()) {
      dynamicTag(path);
      return;
    }

    const tagName = name.get("value").node;

    if (tagName[0] === "@") {
      attributeTag(path);
      return;
    }

    const tagDef = hub.lookup.getTag(tagName) || EMPTY_OBJECT;
    path.set("tagDef", tagDef);

    if (tagDef.codeGeneratorModulePath) {
      const module = require(tagDef.codeGeneratorModulePath);
      const { default: fn = module } = module;
      const node = path.node;
      fn(path);
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
    } else if (macros[tagName]) {
      assertNoAttributeTags();
      macroTag(path, macros[tagName]);
    } else {
      customTag(path, tagDef);
    }

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
