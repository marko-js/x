export default function(path, attr) {
  // TODO should make this more generic.
  // Needs to support more than just native elements.
  path.node.bodyOnlyIf = attr.get("value");
  attr.remove();
}
