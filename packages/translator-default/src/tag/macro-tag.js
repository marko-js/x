import { assertNoArgs, getMacro } from "@marko/babel-utils";

export default function(path) {
  assertNoArgs(path);
  path.set("name", getMacro(path));
  path.requeue();
}
