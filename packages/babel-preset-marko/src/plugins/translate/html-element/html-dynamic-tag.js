import * as t from "../../../definitions";
import { replaceInRenderBody } from "../../../taglib/core/util";
import { getAttrs } from "./util";

export default function(path) {
  const { node, hub } = path;
  const { name: expression } = node.startTag;
  replaceInRenderBody(
    path,
    t.callExpression(
      hub.importNamed(path, "@marko/runtime/helpers", "dynamicTag"),
      [expression, getAttrs(node), t.identifier("out")]
    )
  );
}
