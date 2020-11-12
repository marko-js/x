import { NodePath, MarkoComment } from "@marko/babel-types";

export default function (path: NodePath<MarkoComment>) {
  path.remove();
}
