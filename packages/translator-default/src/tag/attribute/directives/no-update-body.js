import noUpdateTransform from "./no-update";

export default {
  exit(tag, attr) {
    noUpdateTransform.exit(tag, attr, { bodyOnly: true });
  }
};
