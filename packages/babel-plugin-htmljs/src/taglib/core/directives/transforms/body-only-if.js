export default function(path, attr) {
  path.node.bodyOnlyIf = attr.get("value");
  attr.remove();
}
