import { types as t } from "@marko/babel-types";
import { assertNoParams, assertNoArgs } from "@marko/babel-utils";

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
        const { name, arguments: args, value } = attr.node;
        const { confident, value: computed } = attr.get("value").evaluate();

        // Remove falsey attributes.
        if (confident && (computed == null || computed === false)) {
          attr.remove();
          return;
        }

        if (!name) {
          throw attr.buildCodeFrameError(
            "Dynamic attributes are not yet supported in fluurt."
          );
        }

        const [, eventType, eventName] = EVENT_REG.exec(name) || EMPTY_ARRAY;

        if (eventType) {
          // Add event handlers.
          if (args) {
            throw attr.buildCodeFrameError(
              "Event handler is does not support arguments, please pass in a function as the value."
            );
          }

          // TODO: don't use dynamicOn for inline functions?
          return t.callExpression(
            hub.importNamed(
              path,
              "fluurt",
              eventType === "on" ? "dynamicOn" : "once"
            ),
            [t.stringLiteral(eventName), value]
          );
        }

        if (confident) {
          return t.callExpression(hub.importNamed(path, "fluurt", "attr"), [
            t.stringLiteral(name),
            t.stringLiteral(String(computed))
          ]);
        }

        // Add regular attributes.
        // TODO: optimize away computed when possible.
        return t.callExpression(
          hub.importNamed(path, "fluurt", "dynamicAttr"),
          [
            t.stringLiteral(name),
            t.callExpression(hub.importNamed(path, "fluurt", "compute"), [
              t.arrowFunctionExpression([], value)
            ])
          ]
        );
      })
      .filter(Boolean),
    ...(needsBlock ? [t.blockStatement(body)] : body),
    t.callExpression(hub.importNamed(path, "fluurt", "endEl"), [])
  ]);
}
