import { parse as htmlParse } from "./html-parser";
import shiftAST from "./util/shift-ast";
import { getLoc } from "./util/get-loc";
import { visitor } from "./translate";
import { parse, parseExpression } from "@babel/parser";

export default () => {
  return {
    visitor,
    parserOverride(code, parserOpts) {
      return htmlParse({
        code,
        filename: parserOpts.sourceFileName,
        parse(str, start) {
          return shiftAST(parse(str, parserOpts), {
            start,
            ...getLoc(code, start)
          }).program;
        },
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
