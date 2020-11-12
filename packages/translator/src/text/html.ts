import { NodePath, MarkoText } from "@marko/babel-types";
import { writeHTML } from "../util/html-write";

export default function (path: NodePath<MarkoText>) {
  writeHTML(path)`${path.node.value}`;
  path.remove();
}
