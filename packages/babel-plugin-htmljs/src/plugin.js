import { parse } from "./html-parser";
import shiftAST from "./util/shift-ast";
import { getLoc } from "./util/get-loc";
import { visitor } from "./translate";
import { parseExpression } from "@babel/parser";

export default () => {
  return {
    visitor,
    parserOverride(code, parserOpts) {
      return parse({
        code,
        filename: parserOpts.sourceFileName,
        parseExpression(str, start) {
          return shiftAST(parseExpression(str, parserOpts), {
            start,
            ...getLoc(code, start)
          });
        }
      });
    }
  };
};
