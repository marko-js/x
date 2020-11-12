import { NodePath, MarkoText } from "@marko/babel-types";

export default function (path: NodePath<MarkoText>) {
  path.remove();
}
