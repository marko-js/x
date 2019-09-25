import { types as t } from "@marko/babel-types";
import { assertNoParams, assertNoArgs } from "@marko/babel-utils";
import normalizeComputedExpression from "../../util/normalize-computed-expression";

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

        const isAttrValueComputed = normalizeComputedExpression(value);
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

        if (path.get("name").node === "class") {
          debugger;
        }
        return t.callExpression(
          hub.importNamed(path, "fluurt", isAttrValueComputed ? "dynamicAttr" : "attr"),
          [t.stringLiteral(name), value.node]
        );
      })
      .filter(Boolean),
    ...(needsBlock ? [t.blockStatement(body)] : body),
    t.callExpression(hub.importNamed(path, "fluurt", "endEl"), [])
  ]);
}
