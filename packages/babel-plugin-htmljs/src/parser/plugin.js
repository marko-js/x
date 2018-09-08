import { visitor } from "../translate";
import { Hub } from "./hub";
import { parse } from "./index";

export default (_, options) => {
  return {
    visitor,
    parserOverride(code, jsParseOptions) {
      const filename = jsParseOptions.sourceFileName;
      options.jsParseOptions = jsParseOptions;
      return parse(new Hub(filename, code, options));
    }
  };
};
