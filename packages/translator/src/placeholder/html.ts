import {
  NodePath,
  MarkoPlaceholder,
  StringLiteral,
  Expression
} from "@marko/babel-types";
import { isNativeTag } from "@marko/babel-utils";
import * as runtime from "@marko/runtime-fluurt/dist/html";
import { callRuntime } from "../util/runtime";
import { writeHTML } from "../util/html-write";

const ESCAPE_TYPES = {
  script: "escapeScript",
  style: "escapeStyle"
} as Record<string, string>;

export default function (path: NodePath<MarkoPlaceholder>) {
  const { node, parentPath } = path;
  const { confident, value: computed } = path.get("value").evaluate();
  let value: string | Expression = node.value;

  if (node.escape) {
    const parentTagName =
      (parentPath.isMarkoTag() &&
        isNativeTag(parentPath) &&
        (parentPath.node.name as StringLiteral).value) ||
      "";
    const escapeType = ESCAPE_TYPES[parentTagName] || "escapeXML";

    value = confident
      ? runtime[escapeType](computed)
      : callRuntime(path, escapeType, value);
  } else {
    value = confident
      ? runtime.toString(computed)
      : callRuntime(path, "toString", value);
  }

  writeHTML(path)`${value}`;
  path.remove();
}
