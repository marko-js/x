import { assertAllowedAttributes } from "../util";

export default function translate(path) {
  assertAllowedAttributes(path, ["if"]);

  const { node } = path;
  const ifAttr = node.attributes.find(attr => attr.name === "if");

  if (ifAttr) {
    ifAttr.allowArguments = true;
  }
}
