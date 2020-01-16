import noUpdateTransform from "./no-update";

export default {
  enter(tag, attr) {
    noUpdateTransform.enter(tag, attr, { bodyOnly: true });
  }
};
