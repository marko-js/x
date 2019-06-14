import { buildIfStatement } from "./util";
import { assertNoAttributes } from "../util";

export function exit(path) {
  assertNoAttributes(path);
  path.replaceWith(buildIfStatement(path, path.node.arguments));
}
