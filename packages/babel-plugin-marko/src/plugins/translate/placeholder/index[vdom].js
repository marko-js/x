import write from "../../../util/vdom-out-write";
import { replaceInRenderBody } from "../../../taglib/core/util";

export default function(path) {
  const { node } = path;
  const { escape, value } = node;
  const method = escape ? "t" : "h";
  replaceInRenderBody(path, write(method, value));
}
