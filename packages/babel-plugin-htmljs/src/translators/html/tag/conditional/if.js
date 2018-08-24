import { parseIfStatement, strictAttributes } from "./_util";

export default translate;

function translate(path) {
  strictAttributes(path, ["if"]);
  path.replaceWith(parseIfStatement(path));
}
