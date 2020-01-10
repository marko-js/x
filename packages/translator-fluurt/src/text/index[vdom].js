import { decode } from "he";
import { types as t } from "@marko/babel-types";
import withPreviousLocation from "../util/with-previous-location";

export default function(path) {
  const { node, hub } = path;

  path.replaceWith(
    t.callExpression(hub.importRuntime(path, "text"), [
      withPreviousLocation(t.stringLiteral(decode(node.value)), node)
    ])
  );
}
