import * as t from "../../definitions";
import write from "../../util/html-out-write";
import withPreviousLocation from "../../util/with-previous-location";
import { replaceInRenderBody } from "../../taglib/core/util";

export default function(path) {
  const { node, hub } = path;
  let { escape, value } = node;

  if (escape) {
    value = t.callExpression(
      hub.importNamed(
        path,
        "marko/src/runtime/html/helpers",
        "x",
        "marko_escapeXml"
      ),
      [value]
    );
  }

  replaceInRenderBody(path, withPreviousLocation(write`${value}`, node));
}
