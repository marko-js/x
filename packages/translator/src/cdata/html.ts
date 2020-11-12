import { NodePath, MarkoCDATA } from "@marko/babel-types";
import { writeHTML } from "../util/html-write";

export default function (path: NodePath<MarkoCDATA>) {
  writeHTML(path)`<![CDATA[${path.node.value}]]>`;
  path.remove();
}
