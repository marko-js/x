import noUpdateTransform from "./no-update";

export default function(path, attr) {
  noUpdateTransform(path, attr, { if: attr.node.value, bodyOnly: true });
}
