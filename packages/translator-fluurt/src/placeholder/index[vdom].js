import { types as t } from "@marko/babel-types";
export default function(path) {
  const { node, hub } = path;
  const { escape, value } = node;

  if (!escape) {
    throw path.buildCodeFrameError(
      "Unescaped text is not currently supported by the fluurt runtime."
    );
  }

  // TODO: do not use compute if:
  // + just an identifier
  // + input member expression
  // + static value
  path.replaceWith(
    t.callExpression(
      hub.importNamed(path, "fluurt", "compute"),
      [t.arrowFunctionExpression([], value)]
    )
  );
}
