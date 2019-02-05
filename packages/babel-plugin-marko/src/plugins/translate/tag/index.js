import * as t from "../../../definitions";
import dynamicTag from "./dynamic-tag";
import attributeTag from "./attribute-tag";
import nativeTagHTML from "./native-tag[html]";
import nativeTagVDOM from "./native-tag[vdom]";
import customTag from "./custom-tag";
import macroTag from "./macro-tag";

const EMPTY_OBJECT = {};

export default {
  exit(path) {
    const { hub, node } = path;
    const { options, macros } = hub;
    const { name, hasAttributeTag, tagDef = EMPTY_OBJECT } = node;
    node.key = node.key || hub.nextKey();

    if (!t.isStringLiteral(name)) {
      assertNoAttributeTags();
      dynamicTag(path);
      return;
    }

    const tagName = name.value;

    if (tagName[0] === "@") {
      attributeTag(path);
      return;
    }

    if (tagDef.codeGeneratorModulePath) {
      const module = require(tagDef.codeGeneratorModulePath);
      const { default: fn = module } = module;
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
      if (hasAttributeTag) {
        throw hub.buildError(
          hasAttributeTag.name,
          "@tags must be within a custom element."
        );
      }
    }
  }
};
