import * as t from "../../../definitions";
import normalizeTemplateString from "../../../util/normalize-template-string";
import { addNamed } from "@babel/helper-module-imports";

export default function(attrs) {
  if (!attrs.length) {
    return t.stringLiteral("");
  }

  const quasis = [];
  const expressions = [];
  let curString = "";

  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    const { name, value } = attr.node;

    if (!name) {
      quasis.push(curString);
      curString = "";
      expressions.push(
        t.callExpression(
          addNamed(attr, "stringifyAttrs", "@marko/runtime/helpers"),
          [value]
        )
      );
      continue;
    }

    const { confident, value: computed } = attr.get("value").evaluate();

    if (confident && (computed == null || computed === false)) {
      continue;
    }

    if (confident) {
      if (computed == null || computed === false) {
        continue;
      }

      curString += ` ${name}`;

      if (computed !== true) {
        curString += `="${computed}"`;
      }
    } else {
      quasis.push(curString);
      curString = "";
      expressions.push(
        t.callExpression(
          addNamed(attr, "stringifyAttr", "@marko/runtime/helpers"),
          [t.stringLiteral(name), value]
        )
      );
    }
  }

  quasis.push(curString);

  return normalizeTemplateString(quasis, expressions);
}
