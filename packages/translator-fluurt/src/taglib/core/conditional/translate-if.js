import { assertNoAttributes } from "@marko/babel-utils";
import { buildIfStatement } from "./util";

export function exit(path) {
  assertNoAttributes(path);
  path.replaceWith(
    t.expressionStatement(
      t.callExpression(hub.importNamed(path, "fluurt", "conditional"), [
        t.arrowFunctionExpression(
          [],
          buildIfStatement(path, path.node.arguments)
        )
      ])
    )
  );
}
