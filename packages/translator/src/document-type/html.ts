import { NodePath, MarkoDocumentType } from "@marko/babel-types";
import { writeHTML } from "../util/html-write";

export default function (path: NodePath<MarkoDocumentType>) {
  writeHTML(path)`<!${path.node.value}>`;
  path.remove();
}
