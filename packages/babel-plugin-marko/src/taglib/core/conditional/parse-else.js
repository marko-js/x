import { assertAllowedAttributes } from "../util";

export default function translate(path) {
  assertAllowedAttributes(path, ["if"]);

  const { node } = path;
  const { startTag } = path.node;
  const ifAttr = startTag.attributes.find(attr => attr.name === "if");

  if (ifAttr) {
    ifAttr.allowArguments = true;
  }

  return node;
}
