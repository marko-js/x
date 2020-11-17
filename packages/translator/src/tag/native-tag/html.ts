import { types as t, NodePath } from "@marko/babel-types";
import { getTagDef } from "@marko/babel-utils";
import * as runtime from "@marko/runtime-fluurt/dist/html";
import analyzeTagName from "../../util/analyze-tag-name";
import attrsToObject from "../../util/attrs-to-object";
import { flushHTML } from "../../util/html-flush";
import { writeHTML } from "../../util/html-write";
import { callRuntime } from "../../util/runtime";

export function enter(tag: NodePath<t.MarkoTag>) {
  const write = writeHTML(tag);
  const name = tag.get("name");
  const attrs = tag.get("attributes");
  const tagDef = getTagDef(tag);
  const hasSpread = attrs.some(attr => attr.isMarkoSpreadAttribute());
  const { nullable } = analyzeTagName(tag);

  if (nullable) {
    flushHTML(tag, it => tag.get("body").pushContainer("body", it));
  }

  write`<${name.node}`;

  if (hasSpread) {
    write`${callRuntime(tag, "attrs", attrsToObject(tag)!)}`;
  } else {
    for (const attr of attrs as NodePath<t.MarkoAttribute>[]) {
      const name = attr.node.name;
      const value = attr.get("value");
      const { confident, value: computed } = value.evaluate();

      switch (name) {
        case "class":
        case "style":
          if (confident) {
            write`${runtime[`${name}Attr`](computed)}`;
          } else {
            write`${callRuntime(tag, `${name}Attr`, value.node!)}`;
          }
          break;
        default:
          if (confident) {
            write`${runtime.attr(name, computed)}`;
          } else {
            write`${callRuntime(
              tag,
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

  if (nullable) {
    flushHTML(tag, it => {
      tag.insertBefore(t.ifStatement(name.node, t.expressionStatement(it)));
    });
  }
}

export function exit(tag: NodePath<t.MarkoTag>) {
  if (!getTagDef(tag)?.parseOptions?.openTagOnly) {
    writeHTML(tag)`</${tag.node.name}>`;

    if (analyzeTagName(tag).nullable) {
      flushHTML(tag, it => {
        tag.insertBefore(
          t.ifStatement(tag.node.name, t.expressionStatement(it))
        );
      });
    }
  }

  tag.remove();
}
