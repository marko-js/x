export default function(path) {
  const { node, hub } = path;
  const { startTag } = node;
  const { rawValue, start } = startTag;
  const [importNode] = hub.parse(rawValue, start).body;
  return importNode;
}
