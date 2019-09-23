import noUpdateTransform from "./no-update";
import { getArgOrSequence } from "@marko/babel-utils";

export default function(tag, attr) {
  const condition = getArgOrSequence(attr);
  attr.set("allowArguments", true);
  noUpdateTransform(tag, attr, { if: condition });
}
