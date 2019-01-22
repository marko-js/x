import * as t from "../../../definitions";
import { buildIfStatement } from "./util";
import { assertAllowedAttributes, toStatement } from "../util";

export default function translate(path) {
  assertAllowedAttributes(path, ["if"]);

  const { ifStatement } = path.node;

  if (!ifStatement) {
    throw path.buildCodeFrameError(
      "Invalid 'else' tag, expected preceding 'if' or 'else if' tag."
    );
  }

  const { startTag, children } = path.node;
  const ifAttr = startTag.attributes.find(attr => attr.name === "if");

  if (ifAttr) {
    ifStatement.alternate = buildIfStatement(path, ifAttr.arguments);
  } else {
    ifStatement.alternate = t.blockStatement(children.map(toStatement));
  }

  path.remove();
}
