import * as t from "../../../../definitions";
import { isHTMLTag } from "../../util";
export default function(path, attr) {
  const { hub } = path;
  const {
    node: { value }
  } = attr;
  if (t.isStringLiteral(value)) return;
  if (!isHTMLTag(path)) return;
  attr
    .get("value")
    .replaceWith(
      t.callExpression(
        hub.importDefault(
          path,
          "marko/src/runtime/vdom/helper-styleAttr",
          "marko_style_merge"
        ),
        [value]
      )
    );
}
