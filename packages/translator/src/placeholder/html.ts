import {
  NodePath,
  MarkoPlaceholder,
  StringLiteral,
  Expression
} from "@marko/babel-types";
import { isNativeTag } from "@marko/babel-utils";
import {
  toString,
  escapeXML,
  escapeScript,
  escapeStyle
} from "@marko/runtime-fluurt/dist/html";
import { callRuntime } from "../util/runtime";
import { writeHTML } from "../util/html-write";

const ESCAPE_TYPES = {
  html: {
    name: "escapeXML",
    fn: escapeXML
  },
  script: {
    name: "escapeScript",
    fn: escapeScript
  },
  style: {
    name: "escapeStyle",
    fn: escapeStyle
  }
} as Record<string, { name: string; fn(str: string): string }>;

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
    const escapeType = ESCAPE_TYPES[parentTagName] || ESCAPE_TYPES.html;

    value = confident
      ? escapeType.fn(computed)
      : callRuntime(path, escapeType.name, value);
  } else {
    value = confident
      ? toString(computed)
      : callRuntime(path, "toString", value);
  }

  writeHTML(path)`${value}`;
  path.remove();
}
