import { assertIsRoot } from "./util";

export default function(path) {
  assertIsRoot(path);

  const { node, hub } = path;
  const { startTag } = node;
  const { rawValue, start } = startTag;
  const [importNode] = hub.parse(rawValue, start).body;
  path.replaceWith(importNode);
}
