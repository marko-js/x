import {
  assertNoArgs,
  assertNoParams,
  assertNoAttributes
} from "@marko/babel-utils";
import write from "../../util/html-write";

export function enter(path) {
  const { hub } = path;
  assertNoArgs(path);
  assertNoParams(path);
  assertNoAttributes(path);

  if (hub.options.output === "html") {
    const writer = write(path);
    path.replaceWithMultiple([
      writer`<!--`,
      ...path.node.body.body,
      writer`-->`
    ]);
  } else {
    path.remove();
  }
}
