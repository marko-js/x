import * as t from "../../../definitions";
import { buildIfStatement } from "./util";
import { assertAllowedAttributes } from "../util";

export default function translate(path) {
  assertAllowedAttributes(path, ["if"]);

  const { ifStatement, body, attributes } = path.node;

  if (!ifStatement) {
    throw path
      .get("name")
      .buildCodeFrameError(
        "Invalid 'else' tag, expected preceding 'if' or 'else if' tag."
      );
  }

  const ifAttr = attributes.find(attr => attr.name === "if");

  if (ifAttr) {
    ifStatement.alternate = buildIfStatement(path, ifAttr.arguments);
  } else {
    ifStatement.alternate = t.blockStatement(body);
  }

  path.remove();
}
