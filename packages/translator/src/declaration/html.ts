import { NodePath, MarkoDeclaration } from "@marko/babel-types";
import { writeHTML } from "../util/html-write";

export default function (path: NodePath<MarkoDeclaration>) {
  writeHTML(path)`<?${path.node.value}?>`;
  path.remove();
}
