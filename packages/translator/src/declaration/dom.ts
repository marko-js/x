import { NodePath, MarkoDeclaration } from "@marko/babel-types";

export default function (path: NodePath<MarkoDeclaration>) {
  path.remove();
}
