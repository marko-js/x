import * as t from "../../../definitions";
import withPreviousLocation from "../../../util/with-previous-location";

export default function(path) {
  const { node } = path;
  const { _macroId: id, body } = node;
  const params = node.params.concat(t.identifier("out"));
  const block = t.blockStatement(body);
  path.replaceWith(
    withPreviousLocation(t.functionDeclaration(id, params, block), node)
  );
}
