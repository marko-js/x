import { types as t } from "@marko/compiler";
import { writeHTML } from "./util/html-write";
import { isOutputHTML } from "./util/marko-config";
const ieConditionalCommentRegExp = /^\[if |<!\[endif\]$/;

export default function (comment: t.NodePath<t.MarkoComment>) {
  if (isOutputHTML(comment)) {
    const { value } = comment.node;

    if (ieConditionalCommentRegExp.test(value)) {
      writeHTML(comment)`<!--${value}-->`;
    }
  }

  comment.remove();
}
