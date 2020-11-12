import { NodePath, MarkoComment } from "@marko/babel-types";
import { writeHTML } from "../util/html-write";
const ieConditionalCommentRegExp = /^\[if |<!\[endif\]$/;

export default function (path: NodePath<MarkoComment>) {
  const { value } = path.node;

  if (ieConditionalCommentRegExp.test(value)) {
    writeHTML(path)`<!--${value}-->`;
  }

  path.remove();
}
