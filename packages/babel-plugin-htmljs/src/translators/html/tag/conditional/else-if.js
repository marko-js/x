import { parseIfStatement, getPreviousIfStatement } from "./util";

export default translate;

translate.options = {
  rawOpenTag: true
};

function translate(path) {
  const ifStatement = getPreviousIfStatement(path);

  if (!ifStatement) {
    throw path.buildCodeFrameError(
      "Invalid 'else-if' tag, expected preceding 'if' or 'else-if' tag."
    );
  }

  ifStatement.alternate = parseIfStatement(path);
  path.remove();
}
