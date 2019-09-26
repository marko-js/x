import { types as t } from "@marko/babel-types";
import { getAttrs, normalizePropsObject } from "./util";
import getComputedExpression from "../util/get-computed-expression";

export default {
  exit(path) {
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
    const dynamicTagArgs = [
      computedTagName || tagNameExpression.node,
      getAttrs(path, true, true)
    ];

    if (body && body.length) {
      dynamicTagArgs.push(
        t.arrowFunctionExpression(
          node.params || [],
          body.length === 1
            ? t.isExpressionStatement(body[0])
              ? body[0].expression
              : body[0]
            : t.blockStatement(body)
        )
      );
    }
    const [replacement] = path.replaceWith(
      t.expressionStatement(
        t.callExpression(
          hub.importNamed(path, "fluurt", "dynamicTag"),
          dynamicTagArgs
        )
      )
    );

    normalizePropsObject(replacement.get("expression.arguments")[1]);
  }
};
