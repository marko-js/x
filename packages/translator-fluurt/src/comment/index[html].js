import { types as t } from "@marko/babel-types";
import withPreviousLocation from "../util/with-previous-location";
import write from "../util/html-write";
const ieConditionalCommentRegExp = /^\[if [^]*?<!\[endif\]$/;

export default function(path) {
  const { node } = path;

  if (ieConditionalCommentRegExp.test(node.value)) {
    path.replaceWith(
      withPreviousLocation(write(path)`<!--${t.stringLiteral(node.value)}-->`, node)
    );
  } else {
    path.remove();
  }
}
