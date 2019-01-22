import { buildIfStatement } from "./util";
import { replaceInRenderBody, assertAllowedAttributes } from "../util";

export default function(path) {
  assertAllowedAttributes(path, []);
  replaceInRenderBody(
    path,
    buildIfStatement(path, path.node.startTag.arguments)
  );
}
