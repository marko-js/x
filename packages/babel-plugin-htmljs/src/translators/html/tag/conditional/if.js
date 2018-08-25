import {
  buildIfStatement,
  strictAttributes,
  replaceInRenderBody
} from "./_util";

export default translate;

function translate(path) {
  strictAttributes(path, ["if"]);
  replaceInRenderBody(path, buildIfStatement(path));
}
