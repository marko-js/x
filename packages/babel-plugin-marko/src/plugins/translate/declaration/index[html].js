import * as t from "../../../definitions";
import withPreviousLocation from "../../../util/with-previous-location";
import write from "../../../util/html-out-write";

export default function(path) {
  const { node } = path;

  path.replaceWith(
    withPreviousLocation(write`<?${t.stringLiteral(node.value)}?>`, node)
  );
}
