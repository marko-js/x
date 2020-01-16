import noUpdateTransform from "./no-update";
import { getArgOrSequence } from "@marko/babel-utils";

export default {
  enter(tag, attr) {
    noUpdateTransform.enter(tag, attr, {
      if: getArgOrSequence(attr),
      bodyOnly: true
    });
  }
};
