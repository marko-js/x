export default function(path, attr) {
  path.node._nodeKey = attr.get("value").node;
  attr.remove();
}
