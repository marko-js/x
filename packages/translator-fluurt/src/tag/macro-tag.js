import { assertNoArgs, assertNoAttributeTags } from "@marko/babel-utils";

export default function(path, tagIdentifier) {
  assertNoArgs(path);
  assertNoAttributeTags(path);
  path.set("name", tagIdentifier);
  path.requeue();
}
