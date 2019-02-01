import noUpdateTransform from "./no-update";
import { getArgOrSequence } from "../../util";

export default function(path, attr) {
  const condition = getArgOrSequence(attr);
  attr.node.allowArguments = true;
  noUpdateTransform(path, attr, { if: condition, bodyOnly: true });
}
