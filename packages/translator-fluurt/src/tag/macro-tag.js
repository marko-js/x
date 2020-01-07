import { assertNoArgs } from "@marko/babel-utils";

export default function(path, tagIdentifier) {
  assertNoArgs(path);
  path.set("name", tagIdentifier);
  path.requeue();
}
