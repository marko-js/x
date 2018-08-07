import { parseIfStatement } from "./util";

export default translate;

translate.options = {
  rawOpenTag: true
};

// TODO: Remove all logic from else/else-if to here and just throw errors there.

function translate(path) {
  path.replaceWith(parseIfStatement(path));
}
