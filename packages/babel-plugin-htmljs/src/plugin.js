import { parse, parseExpression } from "@babel/parser";
import { parse as htmlParse } from "./html-parser";
import codeFrameError from "./util/code-frame-error";
import shiftAST from "./util/shift-ast";
import { getLoc } from "./util/get-loc";
import { visitor } from "./translate";

export default () => {
  return {
    visitor,
    parserOverride(code, parserOpts) {
      const { sourceFileName: filename } = parserOpts;
      return htmlParse({
        code,
        filename,
        parse(str, start) {
          try {
            return shiftAST(parse(str, parserOpts), {
              start,
              end: start + str.length,
              ...getLoc(code, start, str.length)
            }).program;
          } catch (err) {
            const { pos, message } = err;
            if (pos) {
              throw codeFrameError(
                filename,
                code,
                message.replace(/ *\(\d+:\d+\) *$/, ""),
                pos + start
              );
            } else {
              throw err;
            }
          }
        },
        parseExpression(str, start) {
          try {
            return shiftAST(parseExpression(str, parserOpts), {
              start,
              end: start + str.length,
              ...getLoc(code, start, str.length)
            });
          } catch (err) {
            const { pos, message } = err;
            if (pos) {
              throw codeFrameError(
                filename,
                code,
                message.replace(/ *\(\d+:\d+\) *$/, ""),
                pos + start
              );
            } else {
              throw err;
            }
          }
        }
      });
    }
  };
};
