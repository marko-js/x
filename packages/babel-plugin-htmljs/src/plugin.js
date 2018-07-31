import { parse, parseExpression } from "@babel/parser";
import { parse as htmlParse } from "./html-parser";
import codeFrameError from "./util/code-frame-error";
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
            const { line, column } = getLoc(code, start);
            str = str.padStart(str.length + column - 1, " ");
            return parse(str, { ...parserOpts, startLine: line }).program;
          } catch (err) {
            const { pos, message } = err;
            if (pos) {
              throw codeFrameError(filename, code, message, pos + start);
            } else {
              throw err;
            }
          }
        },
        parseExpression(str, start) {
          try {
            const { line, column } = getLoc(code, start);
            str = str.padStart(str.length + column - 1, " ");
            return parseExpression(str, { ...parserOpts, startLine: line });
          } catch (err) {
            const { pos, message } = err;
            if (pos) {
              throw codeFrameError(filename, code, message, pos + start);
            } else {
              throw err;
            }
          }
        }
      });
    }
  };
};
