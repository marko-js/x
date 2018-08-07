import * as t from "../../../../definitions";
import { toStatement, getPreviousIfStatement } from "./util";

export default translate;

translate.options = {
  rawOpenTag: true
};

function translate(path) {
  const { children } = path.node;
  const ifStatement = getPreviousIfStatement(path);

  if (!ifStatement) {
    throw path.buildCodeFrameError(
      "Invalid else tag, expected preceding 'if' or 'else-if' tag."
    );
  }

  ifStatement.alternate = t.blockStatement(children.map(toStatement));
  path.remove();
}
