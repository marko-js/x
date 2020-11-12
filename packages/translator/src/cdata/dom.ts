import { NodePath, MarkoCDATA } from "@marko/babel-types";

export default function (path: NodePath<MarkoCDATA>) {
  path.remove();
}
