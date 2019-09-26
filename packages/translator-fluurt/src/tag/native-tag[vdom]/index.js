import { types as t } from "@marko/babel-types";
import {
  assertNoParams,
  assertNoArgs,
  assertNoAttributeTags
} from "@marko/babel-utils";
import getComputedExpression from "../../util/get-computed-expression";

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

    path.replaceWithMultiple(
      [
        // TODO: use el when there are no attrs or children.
        t.callExpression(hub.importNamed(path, "fluurt", "beginEl"), [name]),
        ...path
          .get("attributes")
          .map(attr => {
            const value = attr.get("value");
            const { name, arguments: args } = attr.node;
            const { confident, value: evaluated } = value.evaluate();

            // Remove falsey attributes.
            if (confident && (evaluated == null || evaluated === false)) {
              attr.remove();
              return;
            }

            if (!name) {
              throw attr.buildCodeFrameError(
                "TODO: Dynamic attributes are not yet supported on native elements in fluurt."
              );
            }

            const attrValueComputed = getComputedExpression(value);
            const [, eventType, eventName] =
              EVENT_REG.exec(name) || EMPTY_ARRAY;

            if (eventType) {
              // Add event handlers.
              if (args && args.length) {
                throw attr.buildCodeFrameError(
                  "Event handler is does not support arguments, please pass in a function as the value."
                );
              }

              return t.callExpression(
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
              );
            }

            return t.callExpression(
              hub.importNamed(
                path,
                "fluurt",
                attrValueComputed ? "dynamicAttr" : "attr"
              ),
              [t.stringLiteral(name), attrValueComputed || value.node]
            );
          })
          .filter(Boolean),
        ...(needsBlock ? [t.blockStatement(body)] : body),
        t.callExpression(hub.importNamed(path, "fluurt", "endEl"), [])
      ].map(node => (t.isExpression(node) ? t.expressionStatement(node) : node))
    );
  }
};
