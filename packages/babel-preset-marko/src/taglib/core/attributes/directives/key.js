export default function(path, attr) {
  console.log("got attr");
  path._nodeKey = attr.get("value").node;
  attr.remove();
}
