import { Hub } from "./plugin/hub";
import { parse } from ".";
import { visitor as transform } from "./plugin/plugins/transform";
import { visitor as translate } from "./plugin/plugins/translate";
import { visitor as optimize } from "./plugin/plugins/optimize";

export default (_, options) => {
  return {
    parserOverride(code, jsParseOptions) {
      const filename = jsParseOptions.sourceFileName;
      const hub = new Hub(filename, code, { ...options, jsParseOptions });
      // TODO: consider passing path to html parse.
      const ast = parse(hub);
      const nodePath = hub.createNodePath();
      nodePath.traverse(transform);
      // TODO: consider translate on enter and optimize on exit of first pass.
      nodePath.traverse(translate);
      nodePath.traverse(optimize);
      return ast;
    }
  };
};
