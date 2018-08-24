export default translate;

function translate(path, attr) {
  path.node.bodyOnlyIf = attr.get("value");
  debugger;
}
