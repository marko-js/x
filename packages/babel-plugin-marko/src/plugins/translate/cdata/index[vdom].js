import * as t from "../../../definitions";
import withPreviousLocation from "../../../util/with-previous-location";
import write from "../../../util/vdom-out-write";
import { replaceInRenderBody } from "../../../taglib/core/util";

export default function(path) {
  const { node } = path;

  replaceInRenderBody(
    path,
    write("t", withPreviousLocation(t.stringLiteral(node.value), node))
  );
}
