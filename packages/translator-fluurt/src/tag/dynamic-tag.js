import { types as t } from "@marko/babel-types";
import { getAttrs } from "./util";

export default function(path) {
  const { node, hub } = path;
  const {
    name: tagNameExpression,
    arguments: args,
    body: { body }
  } = node;
  // TODO: optimize compute
  path.replaceWith(
    t.expressionStatement(
      t.callExpression(hub.importNamed(path, "fluurt", "dynamicTag"), [
        t.callExpression(hub.importNamed(path, "fluurt", "compute"), [
          t.arrowFunctionExpression(
            [],
            args && args.length
              ? t.callExpression(
                  t.memberExpression(tagNameExpression, "bind"),
                  [tagNameExpression, ...args]
                )
              : tagNameExpression
          )
        ]),
        getAttrs(path, true),
        body
          ? t.arrowFunctionExpression(
              node.params || [],
              body.length === 1 ? body[0] : t.blockStatement(body)
            )
          : undefined
      ])
    )
  );
}
