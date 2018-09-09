import * as t from "../../definitions";
import withPreviousLocation from "../../util/with-previous-location";
import write from "../../util/html-out-write";

export default function(path) {
  const { node, hub } = path;
  const replacement = withPreviousLocation(
    write`${t.stringLiteral(node.value)}`,
    node
  );

  if (t.isProgram(path.parent)) {
    if (node.value.trim()) hub.renderBody.push(replacement);
    path.remove();
  } else {
    path.replaceWith(replacement);
  }
}
