export default function(path, attr) {
  path._nodeKey = attr.get("value").node;
  attr.remove();
}
