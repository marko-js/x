import { types as t } from "@marko/babel-types";
import withPreviousLocation from "../../../util/with-previous-location";

export function exit(path) {
  const { node } = path;
  const {
    _macroId: id,
    body: { body }
  } = node;
  const block = t.blockStatement(body);
  path.replaceWith(
    withPreviousLocation(t.functionDeclaration(id, node.params, block), node)
  );
}
