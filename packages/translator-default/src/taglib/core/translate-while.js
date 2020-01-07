import { types as t } from "@marko/babel-types";
import {
  getArgOrSequence,
  assertNoAttributes,
  assertNoParams
} from "@marko/babel-utils";

export function exit(path) {
  assertNoParams(path);
  assertNoAttributes(path);
  path.replaceWith(
    t.whileStatement(
      getArgOrSequence(path),
      t.blockStatement(path.node.body.body)
    )
  );
}
