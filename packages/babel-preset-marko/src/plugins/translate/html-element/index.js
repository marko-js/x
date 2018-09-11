import * as t from "../../../definitions";
import htmlDynamicTag from "./html-dynamic-tag";
import htmlAttributeTag from "./html-attribute-tag";
import htmlNativeTag from "./html-native-tag";
import htmlCustomTag from "./html-custom-tag";
import { toStatement } from "../../../taglib/core/util";

export default {
  exit(path) {
    const {
      node: {
        tagDef,
        startTag: { name },
        attributeTags
      }
    } = path;

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
    } else {
      htmlCustomTag(path, tagDef);
    }

    function assertNoAttributeTags() {
      if (attributeTags) {
        throw Object.values(attributeTags)[0].buildCodeFrameError(
          "@tags must be within a custom element."
        );
      }
    }
  }
};
