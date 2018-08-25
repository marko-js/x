import * as t from "../../../../definitions";
import { buildIfStatement, toStatement, strictAttributes } from "./_util";

export default translate;

function translate(path) {
  strictAttributes(path, ["if"]);

  const { ifStatement } = path.node;

  if (!ifStatement) {
    throw path.buildCodeFrameError(
      "Invalid 'else' tag, expected preceding 'if' or 'else if' tag."
    );
  }

  const { startTag, children } = path.node;
  const ifAttr = startTag.attributes.find(attr => attr.name === "if");
  ifStatement.alternate = ifAttr
    ? buildIfStatement(path)
    : t.blockStatement(children.map(toStatement));
  path.remove();
}
