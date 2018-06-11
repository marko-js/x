import "@babel/register";
import * as t from "@babel/types";
import types from "./types";

export default () => {
  let imports = `import shallowEqual from '@babel/types/lib/utils/shallowEqual'`;
  let exports = ``;
  let importedTypes = {};

  Object.entries(buildAliasLookup()).forEach(([type, aliases]) => {
    const isBabelType = t.hasOwnProperty(`is${type}`);
    if (isBabelType && !importedTypes[type]) {
      importedTypes[type] = true;
    }
    exports += addIsHelper(type, Object.keys(aliases), isBabelType);
  });

  imports += `
  import { ${Object.keys(importedTypes)
    .map(t => `is${t} as isBabel${t}`)
    .join(", ")} } from '@babel/types';
  `;

  return imports + exports;
};

function buildAliasLookup() {
  const aliases = {};

  Object.entries(types).forEach(([name, def]) => {
    aliases[name] = aliases[name] || { [name]: true };
    if (def.aliases)
      def.aliases.forEach(alias => {
        aliases[alias] = aliases[alias] || { [alias]: true };
        aliases[alias][name] = true;
      });
  });

  return aliases;
}

function addIsHelper(type, aliasKeys, isBabelType) {
  let aliasCheck =
    aliasKeys.map(JSON.stringify).join(" === nodeType || ") + " === nodeType";

  if (isBabelType) {
    aliasCheck = `isBabel${type}(node, opts) || ${aliasCheck}`;
  }

  return `
  export function is${type}(node, opts) {
    if (!node) return false;
    const nodeType = node.type;
    if (${aliasCheck}) {
      if (typeof opts === "undefined") {
        return true;
      } else {
        return shallowEqual(node, opts);
      }
    }
    return false;
  }
  `;
}
