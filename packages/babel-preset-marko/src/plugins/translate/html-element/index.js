import * as t from "../../../definitions";
import htmlDynamicTag from "./html-dynamic-tag";
import htmlAttributeTag from "./html-attribute-tag";
import htmlNativeTag from "./html-native-tag";
import htmlCustomTag from "./html-custom-tag";
import htmlMacroTag from "./html-macro-tag";

const EMPTY_OBJECT = {};

export default {
  exit(path) {
    const {
      hub,
      node: { tagDef = EMPTY_OBJECT, startTag, attributeTags }
    } = path;
    const { macros } = hub;
    const { name } = startTag;
    startTag.key = hub.getKey(path);

    if (!t.isStringLiteral(name)) {
      assertNoAttributeTags();
      htmlDynamicTag(path);
      return;
    }

    const tagName = name.value;

    if (tagName[0] === "@") {
      htmlAttributeTag(path);
      return;
    }

    if (tagDef.codeGeneratorModulePath) {
      const module = require(tagDef.codeGeneratorModulePath);
      const { default: fn = module } = module;
      fn(path);
    } else if (tagDef.html) {
      assertNoAttributeTags();
      htmlNativeTag(path);
    } else if (macros[tagName]) {
      assertNoAttributeTags();
      htmlMacroTag(path, macros[tagName]);
    } else {
      htmlCustomTag(path, tagDef);
    }

    function assertNoAttributeTags() {
      if (attributeTags) {
        throw hub.buildError(
          Object.values(attributeTags)[0][0],
          "@tags must be within a custom element."
        );
      }
    }
  }
};
