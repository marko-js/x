import { replaceInRenderBody } from "../../taglib/core/util";

export default function(path) {
  const { node } = path;

  if (node.static) {
    path.replaceWithMultiple(node.body);
  } else {
    replaceInRenderBody(path, node.body);
  }
}
