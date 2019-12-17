import { getFullyResolvedTagName } from "@marko/babel-utils";
import dynamicTag from "./dynamic-tag";
import attributeTag from "./attribute-tag";
import nativeTagHTML from "./native-tag[html]";
import nativeTagVDOM from "./native-tag[dom]";
import customTag from "./custom-tag";
import macroTag from "./macro-tag";

const EMPTY_OBJECT = {};

export default {
  enter(path) {
    const { hub, node } = path;
    const { options, macros } = hub;
    const name = path.get("name");
    const tagName = name.get("value").node;
    const isAttributeTag = tagName && tagName[0] === "@";

    if (!name.isStringLiteral()) {
      enter(dynamicTag, path);
      return;
    }

    if (isAttributeTag) {
      enter(attributeTag, path);
      return;
    }

    if (macros[tagName]) {
      enter(macroTag, path, macros[tagName]);
      return;
    }

    const tagDef =
      hub.lookup.getTag(getFullyResolvedTagName(path)) || EMPTY_OBJECT;
    path.set("tagDef", tagDef);

    if (tagDef.codeGeneratorModulePath) {
      tagDef.codeGenerator = require(tagDef.codeGeneratorModulePath);
      enter(tagDef.codeGenerator, path);
      if (path.node !== node) {
        return;
      }
    }

    if (tagDef.html) {
      if (options.output === "html") {
        enter(nativeTagHTML, path);
      } else {
        enter(nativeTagVDOM, path);
      }
    } else {
      enter(customTag, path, tagDef);
    }
  },
  exit(path) {
    const { hub, node } = path;
    const { options, macros } = hub;
    const tagDef = path.get("tagDef").node;
    const name = path.get("name");
    const tagName = name.get("value").node;
    const isAttributeTag = tagName && tagName[0] === "@";

    if (!name.isStringLiteral()) {
      exit(dynamicTag, path);
      return;
    }

    if (isAttributeTag) {
      exit(attributeTag, path);
      return;
    }

    if (macros[tagName]) {
      exit(macroTag, path, macros[tagName]);
      return;
    }

    if (tagDef.codeGenerator) {
      exit(tagDef.codeGenerator, path);
      if (path.node !== node) {
        return;
      }
    }

    if (tagDef.html) {
      if (options.output === "html") {
        exit(nativeTagHTML, path);
      } else {
        exit(nativeTagVDOM, path);
      }
    } else {
      exit(customTag, path, tagDef);
    }
  }
};

function enter(plugin, ...args) {
  const fn =
    (plugin &&
      (plugin.enter ||
        ((plugin.default && plugin.default.enter) || plugin.default))) ||
    plugin;
  if (typeof fn === "function") {
    fn(...args);
  }
}

function exit(plugin, ...args) {
  const fn =
    plugin &&
    (plugin.exit || (plugin.default ? plugin.default.exit : undefined));
  if (typeof fn === "function") {
    fn(...args);
  }
}
