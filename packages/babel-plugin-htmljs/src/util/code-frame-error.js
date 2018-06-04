import { codeFrameColumns } from "@babel/code-frame";
import { getLoc } from "./get-loc";

export default (filename, code, msg, startPos, endPos) => {
  const start = getLoc(code, startPos);
  const end = endPos != null && getLoc(code, endPos);
  const frame = codeFrameColumns(code, { start, end });
  return new SyntaxError(`${filename}: ${msg}\n${frame}`);
};
