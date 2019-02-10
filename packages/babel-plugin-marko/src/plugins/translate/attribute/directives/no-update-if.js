import noUpdateTransform from "./no-update";
import { getArgOrSequence } from "../../../../taglib/core/util";

export default function(tag, attr) {
  const condition = getArgOrSequence(attr);
  attr.node.allowArguments = true;
  noUpdateTransform(tag, attr, { if: condition });
}
