import { parseIfStatement } from "./_util";

export default translate;

function translate(path) {
  path.replaceWith(parseIfStatement(path));
}
