import * as t from "../../../../definitions";
import {
  parseIfStatement,
  strictAttributes,
  replaceInRenderBody
} from "./_util";

export default translate;

function translate(path) {
  strictAttributes(path, ["if"]);
  replaceInRenderBody(path, parseIfStatement(path));
}
