import { buildIfStatement } from "./util";
import { replaceInRenderBody, assertAllowedAttributes } from "../util";

export default function(path) {
  assertAllowedAttributes(path, ["if"]);
  replaceInRenderBody(path, buildIfStatement(path));
}
