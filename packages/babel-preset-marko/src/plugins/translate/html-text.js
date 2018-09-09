import * as t from "../../definitions";
import withPreviousLocation from "../../util/with-previous-location";
import write from "../../util/html-out-write";
import { replaceInRenderBody } from "../../taglib/core/util";

export default function(path) {
  const { node } = path;

  replaceInRenderBody(
    path,
    withPreviousLocation(write`${t.stringLiteral(node.value)}`, node)
  );
}
