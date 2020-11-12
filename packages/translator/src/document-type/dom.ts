import { NodePath, MarkoDocumentType } from "@marko/babel-types";

export default function (path: NodePath<MarkoDocumentType>) {
  path.remove();
}
