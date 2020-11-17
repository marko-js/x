import { types as t, NodePath } from "@marko/babel-types";
import { isNativeTag } from "@marko/babel-utils";
import * as runtime from "@marko/runtime-fluurt/dist/html";
import { callRuntime } from "../util/runtime";
import { writeHTML } from "../util/html-write";

const ESCAPE_TYPES = {
  script: "escapeScript",
  style: "escapeStyle"
} as Record<string, string>;

export default function (placeholder: NodePath<t.MarkoPlaceholder>) {
  const { node, parentPath } = placeholder;
  const { confident, value: computed } = placeholder.get("value").evaluate();
  let value: string | t.Expression = node.value;

  if (node.escape) {
    const parentTagName =
      (parentPath.isMarkoTag() &&
        isNativeTag(parentPath) &&
        (parentPath.node.name as t.StringLiteral).value) ||
      "";
    const escapeType = ESCAPE_TYPES[parentTagName] || "escapeXML";

    value = confident
      ? runtime[escapeType](computed)
      : callRuntime(placeholder, escapeType, value);
  } else {
    value = confident
      ? runtime.toString(computed)
      : callRuntime(placeholder, "toString", value);
  }

  writeHTML(placeholder)`${value}`;
  placeholder.remove();
}
