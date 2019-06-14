import { buildIfStatement } from "./util";
import { assertNoAttributes } from "../util";

export function exit(path) {
  assertNoAttributes(path);

  const { ifStatement, arguments: args } = path.node;

  if (!ifStatement) {
    throw path
      .get("name")
      .buildCodeFrameError(
        "Invalid 'else-if' tag, expected preceding 'if' or 'else-if' tag."
      );
  }

  ifStatement.alternate = buildIfStatement(path, args);
  path.remove();
}
