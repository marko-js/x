import { types as t } from "@marko/babel-types";
import withPreviousLocation from "../util/with-previous-location";
import write from "../util/html-write";

export default function(path) {
  const { node } = path;

  path.replaceWith(
    withPreviousLocation(write(path)`<!${t.stringLiteral(node.value)}>`, node)
  );
}
