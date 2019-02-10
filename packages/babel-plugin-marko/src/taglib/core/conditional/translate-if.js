import { buildIfStatement } from "./util";
import { assertAllowedAttributes } from "../util";

export default function(path) {
  assertAllowedAttributes(path, []);
  path.replaceWith(buildIfStatement(path, path.node.arguments));
}
