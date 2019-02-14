import * as t from "../../../definitions";
import { assertNoArgs, assertNoAttributes } from "../util";

export default function translate(path) {
  assertNoArgs(path);
  assertNoAttributes(path);

  const { ifStatement, body } = path.node;

  if (!ifStatement) {
    throw path
      .get("name")
      .buildCodeFrameError(
        "Invalid 'else' tag, expected preceding 'if' or 'else-if' tag."
      );
  }

  ifStatement.alternate = t.blockStatement(body);
  path.remove();
}
