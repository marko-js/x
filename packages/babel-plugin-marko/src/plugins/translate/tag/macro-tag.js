import { assertNoArgs } from "../../../taglib/core/util";

export default function(path, tagIdentifier) {
  assertNoArgs(path);
  path.set("name", tagIdentifier);
  path.requeue();
}
