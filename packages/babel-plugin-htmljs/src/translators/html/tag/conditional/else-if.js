import { parseIfStatement } from "./_util";

export default translate;

translate.options = {
  rawOpenTag: true
};

function translate(path) {
  const { ifStatement } = path.node;

  if (!ifStatement) {
    throw path.buildCodeFrameError(
      "Invalid 'else-if' tag, expected preceding 'if' or 'else-if' tag."
    );
  }

  ifStatement.alternate = parseIfStatement(path);
  path.remove();
}
