import { types as t } from "@marko/babel-types";
import { getAttrs, normalizePropsObject } from "./util";
import getComputedExpression from "../util/get-computed-expression";

export default function(path) {
  const { node, hub } = path;
  const {
    arguments: args,
    body: { body }
  } = node;
  let tagNameExpression = path.get("name");

  if (args && args.length) {
    [tagNameExpression] = tagNameExpression.replaceWith(
      t.callExpression(t.memberExpression(tagNameExpression.node, "bind"), [
        tagNameExpression.node,
        ...args
      ])
    );
  }

  const computedTagName = getComputedExpression(tagNameExpression);
  const [replacement] = path.replaceWith(
    t.expressionStatement(
      t.callExpression(hub.importNamed(path, "fluurt", "dynamicTag"), [
        computedTagName || tagNameExpression.node,
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

  normalizePropsObject(replacement.get("expression.arguments")[1]);
}
