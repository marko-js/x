import { types as t } from "@marko/babel-types";
import {
  assertNoParams,
  assertNoArgs,
  assertNoAttributeTags
} from "@marko/babel-utils";
import getComputedExpression from "../../util/get-computed-expression";
import { getAttrs, normalizePropsObject } from "../util";

const EVENT_REG = /^(on(?:ce)?)([A-Z].*)$/;
const EMPTY_ARRAY = [];

/**
 * Translates the html streaming version of a standard html element.
 */
export default {
  exit(path) {
    assertNoArgs(path);
    assertNoParams(path);
    assertNoAttributeTags(path);

    const { hub, node } = path;
    const {
      name,
      body: { body }
    } = node;
    const needsBlock = body.some(
      it =>
        t.isVariableDeclaration(it) &&
        (it.kind === "const" || it.kind === "let")
    );

    path.insertBefore(
      t.expressionStatement(
        t.callExpression(hub.importNamed(path, "fluurt", "beginEl"), [name])
      )
    );

    const attributes = path.get("attributes");
    const hasSpreadAttributes = attributes.some(attr =>
      attr.isMarkoSpreadAttribute()
    );

    if (hasSpreadAttributes) {
      const [dynamicAttrsPath] = path.insertBefore(
        t.expressionStatement(
          t.callExpression(hub.importNamed(path, "fluurt", "dynamicAttrs"), [
            getAttrs(path, true, true)
          ])
        )
      );

      normalizePropsObject(dynamicAttrsPath.get("expression.arguments")[0]);
    } else {
      attributes.forEach(attr => {
        const value = attr.get("value");
        const { name, arguments: args } = attr.node;
        const { confident, value: evaluated } = value.evaluate();

        // Remove falsey attributes.
        if (confident && (evaluated == null || evaluated === false)) {
          return;
        }

        const attrValueComputed = getComputedExpression(value);
        const [, eventType, eventName] = EVENT_REG.exec(name) || EMPTY_ARRAY;

        if (eventType) {
          // Add event handlers.
          if (args && args.length) {
            throw attr.buildCodeFrameError(
              "Event handler is does not support arguments, please pass in a function as the value."
            );
          }

          path.insertBefore(
            t.expressionStatement(
              t.callExpression(
                hub.importNamed(
                  path,
                  "fluurt",
                  eventType === "on"
                    ? attrValueComputed
                      ? "dynamicOn"
                      : "on"
                    : "once"
                ),
                [
                  t.stringLiteral(eventName.toLowerCase()),
                  attrValueComputed || value.node
                ]
              )
            )
          );
        } else {
          path.insertBefore(
            t.expressionStatement(
              t.callExpression(
                hub.importNamed(
                  path,
                  "fluurt",
                  attrValueComputed ? "dynamicAttr" : "attr"
                ),
                [t.stringLiteral(name), attrValueComputed || value.node]
              )
            )
          );
        }
      });
    }

    if (body && body.length) {
      path.insertBefore(needsBlock ? t.blockStatement(body) : body);
    }

    path.insertBefore(
      t.expressionStatement(
        t.callExpression(hub.importNamed(path, "fluurt", "endEl"), [])
      )
    );

    path.remove();
  }
};
