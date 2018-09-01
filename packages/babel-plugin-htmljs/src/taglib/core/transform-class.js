import * as t from "../../definitions";
import { assertIsRoot } from "./util";

export default function(path) {
  assertIsRoot(path);

  const { node, hub } = path;
  const { startTag } = node;
  const { rawValue: code, start } = startTag;

  path.replaceWith(
    t.exportNamedDeclaration(
      t.variableDeclaration("const", [
        t.variableDeclarator(
          t.identifier("component"),
          hub.parseExpression(code, start)
        )
      ]),
      []
    )
  );
}
