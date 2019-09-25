import { types as t } from "@marko/babel-types";
import normalizeComputedExpression from "../util/normalize-computed-expression";
export default function(path) {
  const { hub } = path;

  if (!path.get("escape").node) {
    throw path.buildCodeFrameError(
      "Unescaped text is not currently supported by the fluurt runtime."
    );
  }

  const value = path.get("value");
  const isComputed = normalizeComputedExpression(value);

  path.replaceWith(
    t.callExpression(
      hub.importNamed(path, "fluurt", isComputed ? "dynamicText" : "text"),
      [value.node]
    )
  );
}
