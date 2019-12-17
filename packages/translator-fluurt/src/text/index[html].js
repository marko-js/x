import { types as t } from "@marko/babel-types";
import write from "../util/html-write";

export default function(path) {
  const { node } = path;
  path.replaceWith(write(path)`${t.stringLiteral(node.value)}`);
}
