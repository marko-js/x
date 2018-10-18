import * as t from "../../../definitions";
import withPreviousLocation from "../../../util/with-previous-location";
import { toStatement } from "../util";

export default function(path) {
  const { node } = path;
  const { _macroId: id, startTag, children } = node;
  const params = (startTag.params || []).concat(t.identifier("out"));
  const block = t.blockStatement(children.map(toStatement));
  path.replaceWith(
    withPreviousLocation(t.functionDeclaration(id, params, block), node)
  );
}
