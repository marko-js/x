import * as t from "../../definitions";
import htmlDynamicTag from "./html-dynamic-tag";
import htmlAttributeTag from "./html-attribute-tag";
import htmlNativeTag from "./html-native-tag";
import htmlCustomTag from "./html-custom-tag";

export default {
  exit(path) {
    const {
      hub: { lookup },
      node: {
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

    const tagDef = lookup.getTag(tagName);

    if (!tagDef) {
      throw path.buildCodeFrameError(`Could not find custom tag "${tagName}".`);
    }

    Object.values(tagDef.transformers).forEach(transformer => {
      const module = require(transformer.path);
      const { default: fn = module } = module;
      fn(path);
    });

    if (tagDef.taglibId === "marko-core") {
      if (!["if", "else", "for"].includes(tagName)) {
        assertNoAttributeTags();
      }
    } else if (tagDef.html) {
      assertNoAttributeTags();
      htmlNativeTag(path, tagDef);
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
