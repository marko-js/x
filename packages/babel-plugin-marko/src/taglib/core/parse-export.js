export default function(path) {
  const { node, hub } = path;
  const { startTag } = node;
  const { rawValue, start } = startTag;
  const [exportNode] = hub.parse(rawValue, start).body;
  return exportNode;
}
