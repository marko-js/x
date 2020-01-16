import noUpdateTransform from "./no-update";
import { getArgOrSequence } from "@marko/babel-utils";

export default {
  exit(tag, attr) {
    noUpdateTransform.exit(tag, attr, { if: getArgOrSequence(attr) });
  }
};
