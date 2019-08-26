import * as t from "../../../definitions";
import { getAttrs, buildEventHandlerArray } from "./util";

export default function(path) {
  const { node, hub } = path;
  const { options } = hub;
  const { name: tagNameExpression, key, arguments: args } = node;

  const foundAttrs = getAttrs(path, true);
  const renderBodyProp = foundAttrs.properties.find(
    prop => prop.key && prop.key.value === "renderBody"
  );
  const dynamicTagRenderCall = t.callExpression(
    hub.importNamed(
      path,
      `marko/src/runtime/${options.output}/helpers`,
      "d",
      "marko_dynamicTag"
    ),
    [
      t.identifier("out"),
      tagNameExpression,
      foundAttrs.properties.length
        ? t.arrowFunctionExpression([], foundAttrs)
        : t.nullLiteral(),
      renderBodyProp ? renderBodyProp.value : t.nullLiteral(),
      args.length ? t.arrayExpression(args) : t.nullLiteral(),
      t.nullLiteral(), // props
      hub._componentDefIdentifier,
      key,
      ...buildEventHandlerArray(path)
    ]
  );

  path.replaceWith(dynamicTagRenderCall);
}
