import { types as t } from "@marko/babel-types";
import getComputedExpression from "../util/get-computed-expression";
export default function(path) {
  const { hub } = path;

  if (!path.get("escape").node) {
    throw path.buildCodeFrameError(
      "TODO: Unescaped text is not currently supported by the fluurt runtime."
    );
  }

  const value = path.get("value");
  const computed = getComputedExpression(value);

  path.replaceWith(
    t.expressionStatement(
      t.callExpression(
        hub.importRuntime(path, computed ? "dynamicText" : "text"),
        [computed || value.node]
      )
    )
  );
}
