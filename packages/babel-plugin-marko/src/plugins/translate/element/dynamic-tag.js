import * as t from "../../../definitions";
import { replaceInRenderBody } from "../../../taglib/core/util";
import { getAttrs, buildEventHandlerArray } from "./util";

export default function(path) {
  const { node, hub } = path;
  const { options } = hub;
  const { key, startTag } = node;
  const { name: expression } = startTag;

  replaceInRenderBody(
    path,
    t.callExpression(
      hub.importNamed(
        path,
        `marko/src/runtime/${options.output}/helpers`,
        "d",
        "marko_dynamicTag"
      ),
      [
        expression,
        getAttrs(path),
        t.identifier("out"),
        t.identifier("__component"),
        key,
        ...buildEventHandlerArray(path)
      ]
    )
  );
}
