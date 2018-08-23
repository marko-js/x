import * as t from "../../../../definitions";
import { parseIfStatement } from "./_util";

export default translate;

translate.options = {
  rawOpenTag: true
};

function translate(path) {
  path.replaceWith(parseIfStatement(path));
}
