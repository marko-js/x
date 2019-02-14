import { assertNoArgs, assertNoParams, assertNoAttributes } from "./util";
import write from "../../util/html-out-write";

export default function(path) {
  const { hub } = path;
  assertNoArgs(path);
  assertNoParams(path);
  assertNoAttributes(path);

  if (hub.options.output === "html") {
    path.replaceWithMultiple([write`<!--`, ...path.node.body, write`-->`]);
  } else {
    path.remove();
  }
}
