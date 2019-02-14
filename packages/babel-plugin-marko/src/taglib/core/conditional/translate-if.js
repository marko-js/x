import { buildIfStatement } from "./util";
import { assertNoAttributes } from "../util";

export default function(path) {
  assertNoAttributes(path);
  path.replaceWith(buildIfStatement(path, path.node.arguments));
}
