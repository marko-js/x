import { Hub } from "./hub";
import { parse } from "./parser";
import { visitor as transform } from "./plugins/transform";
import { visitor as translate } from "./plugins/translate";
import { visitor as finalize } from "./plugins/finalize";
import { NodePath } from "@babel/traverse";

export default (api, options) => {
  const isProduction = api.env("production");
  return {
    parserOverride(code, jsParseOptions) {
      const filename = jsParseOptions.sourceFileName;
      const hub = new Hub(filename, code, {
        ...options,
        jsParseOptions,
        isProduction
      });
      const nodePath = new NodePath(hub);
      nodePath.node = hub.file;
      parse(nodePath);

      // TODO: this package should be split into 3:
      // 1. babel-syntax-marko (removes the need for the _parseOnly option)
      // 2. babel-plugin-transform-marko (only runs transformers without converting Marko nodes to js)
      // 3. babel-plugin-translate-marko (runs final translations)
      if (!options._parseOnly) {
        nodePath.get("program").scope.crawl(); // Initialize bindings.
        nodePath.traverse(transform);
        nodePath.traverse(translate);
        nodePath.traverse(finalize);
      }

      return hub.file;
    }
  };
};
