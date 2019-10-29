import { relative } from "path";
import { codeFrameColumns } from "@babel/code-frame";
import { getLoc } from "./get-loc";
import complain from "complain";
const cwd = process.cwd();

export default (filename = "", code, msg, currentNode, startPos, endPos) => {
  const start = getLoc(code, startPos);
  const end = endPos != null && getLoc(code, endPos);
  const frame = codeFrameColumns(code, { start, end }, { highlightCode: true });
  const position = `(${start.line},${start.column})`;
  const location = currentNode && currentNode.pos;
  const options = { location };

  if (location != null) {
    options.location = position;
  } else {
    options.location = filename;
  }

  return complain(
    `${relative(cwd, filename)}${position}: ${msg}\n${frame}`,
    options
  );
};
