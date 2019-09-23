import noUpdateTransform from "./no-update";

export default function(tag, attr) {
  noUpdateTransform(tag, attr, { bodyOnly: true });
}
