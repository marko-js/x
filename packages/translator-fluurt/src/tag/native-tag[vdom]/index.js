import { types as t } from "@marko/babel-types";
import { assertNoParams, assertNoArgs } from "@marko/babel-utils";
import getComputedExpression from "../../util/get-computed-expression";

const EVENT_REG = /^(on(?:ce)?)(.*)$/;
const EMPTY_ARRAY = [];

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {
  assertNoParams(path);
  assertNoArgs(path);

  const { hub, node } = path;
  const {
    name,
    body: { body }
  } = node;
  const needsBlock = body.some(
    it =>
      t.isVariableDeclaration(it) && (it.kind === "const" || it.kind === "let")
  );

  path.replaceWithMultiple([
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
            "Dynamic attributes are not yet supported in fluurt."
          );
        }

        const attrValueComputed = getComputedExpression(value);
        const [, eventType, eventName] = EVENT_REG.exec(name) || EMPTY_ARRAY;

        if (eventType) {
          // Add event handlers.
          if (args) {
            throw attr.buildCodeFrameError(
              "Event handler is does not support arguments, please pass in a function as the value."
            );
          }

          // TODO: don't use dynamicOn for inline functions? (is it even worth have a non dynamic on?)
          return t.callExpression(
            hub.importNamed(
              path,
              "fluurt",
              eventType === "on" ? "dynamicOn" : "once"
            ),
            [t.stringLiteral(eventName), value.node]
          );
        }

        return t.callExpression(
          hub.importNamed(path, "fluurt", attrValueComputed ? "dynamicAttr" : "attr"),
          [t.stringLiteral(name), attrValueComputed || value.node]
        );
      })
      .filter(Boolean),
    ...(needsBlock ? [t.blockStatement(body)] : body),
    t.callExpression(hub.importNamed(path, "fluurt", "endEl"), [])
  ]);
}
