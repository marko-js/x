import {
  types as t,
  NodePath,
  MarkoTag,
  Expression,
  SpreadElement,
  MarkoAttribute
} from "@marko/babel-types";
import { getTagDef } from "@marko/babel-utils";
import * as runtime from "@marko/runtime-fluurt/dist/html";
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
    let attrsObject: Expression = t.objectExpression([]);

    for (const attr of attrs) {
      const value = attr.node.value!;

      if (attr.isMarkoSpreadAttribute()) {
        attrsObject.properties.push(t.spreadElement(value));
      } else if (attr.isMarkoAttribute()) {
        attrsObject.properties.push(
          t.objectProperty(t.stringLiteral(attr.node.name), value)
        );
      }
    }

    if (attrsObject.properties.length === 1) {
      attrsObject = (attrsObject.properties[0] as SpreadElement).argument;
    }

    write`${callRuntime(path, "attrs", attrsObject)}`;
  } else {
    for (const attr of attrs as NodePath<MarkoAttribute>[]) {
      const name = attr.node.name;
      const value = attr.get("value");
      const { confident, value: computed } = value.evaluate();

      if (confident) {
        write`${runtime.attr(name, computed)}`;
      } else {
        write`${callRuntime(path, "attr", t.stringLiteral(name), value.node!)}`;
      }
    }
  }

  if (tagDef && tagDef.parseOptions?.openTagOnly && name.isStringLiteral()) {
    const htmlType = tagDef.htmlType;
    path.remove();

    if (htmlType === "svg" || htmlType === "math") {
      write`/>`;
    } else {
      write`>`;
    }
  } else {
    write`>`;
  }
}

export function exit(path: NodePath<MarkoTag>) {
  writeHTML(path)`</${path.node.name}>`;
  path.remove();
}
