import { addNamed } from "@babel/helper-module-imports";
import * as t from "../../definitions";
import write from "../../util/html-out-write";
import withPreviousLocation from "../../util/with-previous-location";

export default function(path) {
  const { node, hub } = path;
  let { escape, value } = node;

  if (escape) {
    value = t.callExpression(
      addNamed(path, "escape", "@marko/runtime/helpers"),
      [value]
    );
  }

  const replacement = withPreviousLocation(write`${value}`, node);
  if (t.isProgram(path.parent)) {
    path.remove();
    hub.renderBody.push(replacement);
  } else {
    path.replaceWith(replacement);
  }
}
