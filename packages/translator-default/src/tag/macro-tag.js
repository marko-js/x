import { assertNoArgs, getMacroIdentifier } from "@marko/babel-utils";

export default function(path) {
  assertNoArgs(path);
  path.set("name", getMacroIdentifier(path));
  path.requeue();
}
