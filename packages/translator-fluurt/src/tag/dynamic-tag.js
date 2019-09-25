import { types as t } from "@marko/babel-types";
import { getAttrs } from "./util";
import getComputedExpression from "../util/get-computed-expression";

export default function(path) {
  const { node, hub } = path;
  const {
    arguments: args,
    body: { body }
  } = node;
  const tagNameExpression = path.get("name");

  if (args && args.length) {
    tagNameExpression.replaceWith(
      t.callExpression(t.memberExpression(tagNameExpression.node, "bind"), [
        tagNameExpression.node,
        ...args
      ])
    );
  }

  const computedTagName = getComputedExpression(tagNameExpression);

  // TODO: optimize compute
  path.replaceWith(
    t.expressionStatement(
      t.callExpression(hub.importNamed(path, "fluurt", "dynamicTag"), [
        computedTagName || tagNameExpression,
        getAttrs(path, true), // TODO: these attrs need to be signals or computed
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
