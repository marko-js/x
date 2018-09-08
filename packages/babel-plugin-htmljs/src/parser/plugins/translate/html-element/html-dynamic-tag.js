import { addNamed } from "@babel/helper-module-imports";
import * as t from "../../../../definitions";
import { replaceInRenderBody } from "../../../../taglib/core/util";
import { getAttrs } from "./util";

export default function(path) {
  const { node } = path;
  const { name: expression } = node.startTag;
  replaceInRenderBody(
    path,
    t.callExpression(addNamed(path, "dynamicTag", "@marko/runtime/helpers"), [
      expression,
      getAttrs(node),
      t.identifier("out")
    ])
  );
}
