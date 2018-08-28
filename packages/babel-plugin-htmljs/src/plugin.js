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
        parse: tryParse(false),
        parseExpression: tryParse(true)
      });

      function tryParse(isExpression) {
        return (str, start) => {
          const { line, column } = getLoc(code, start);
          const opts = { ...parserOpts, startLine: line };
          const length = str.length - 1 + column;
          const padding = length - str.length - 1;
          str = str.padStart(length, " ");

          try {
            return isExpression
              ? parseExpression(str, opts)
              : parse(str, opts).program;
          } catch (err) {
            let { pos, message } = err;
            if (pos) {
              pos -= padding;
              pos += start;
              throw codeFrameError(
                filename,
                code,
                message.replace(/ *\(\d+:\d+\)$/, ""),
                pos
              );
            } else {
              throw err;
            }
          }
        };
      }
    }
  };
};
