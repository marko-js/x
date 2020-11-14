import {
  types as t,
  NodePath,
  MarkoTag,
  MarkoAttribute
} from "@marko/babel-types";
import { getTagDef } from "@marko/babel-utils";
import * as runtime from "@marko/runtime-fluurt/dist/html";
import attrsToObject from "../../util/attrs-to-object";
import { writeHTML } from "../../util/html-write";
import { callRuntime } from "../../util/runtime";

export function enter(path: NodePath<MarkoTag>) {
  const write = writeHTML(path);
  const name = path.get("name");
  const attrs = path.get("attributes");
  const tagDef = getTagDef(path) as
    | { htmlType?: string; parseOptions?: { openTagOnly: boolean } }
    | undefined;
  const hasSpread = attrs.some(attr => attr.isMarkoSpreadAttribute());

  write`<${name.node}`;

  if (hasSpread) {
    write`${callRuntime(path, "attrs", attrsToObject(path))}`;
  } else {
    for (const attr of attrs as NodePath<MarkoAttribute>[]) {
      const name = attr.node.name;
      const value = attr.get("value");
      const { confident, value: computed } = value.evaluate();

      switch (name) {
        case "class":
        case "style":
          if (confident) {
            write`${runtime[`${name}Attr`](computed)}`;
          } else {
            write`${callRuntime(path, `${name}Attr`, value.node!)}`;
          }
          break;
        default:
          if (confident) {
            write`${runtime.attr(name, computed)}`;
          } else {
            write`${callRuntime(
              path,
              "attr",
              t.stringLiteral(name),
              value.node!
            )}`;
          }

          break;
      }
    }
  }

  if (tagDef && tagDef.parseOptions?.openTagOnly) {
    path.remove();

    switch (tagDef.htmlType) {
      case "svg":
      case "math":
        write`/>`;
        break;
      default:
        write`>`;
        break;
    }
  } else {
    write`>`;
  }
}

export function exit(path: NodePath<MarkoTag>) {
  writeHTML(path)`</${path.node.name}>`;
  path.remove();
}
