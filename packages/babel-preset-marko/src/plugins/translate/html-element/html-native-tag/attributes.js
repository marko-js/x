import * as t from "../../../../definitions";
import normalizeTemplateString from "../../../../util/normalize-template-string";

export default function(attrs) {
  if (!attrs.length) {
    return t.stringLiteral("");
  }

  const quasis = [];
  const expressions = [];
  let curString = "";

  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    const {
      hub,
      node: { name, value }
    } = attr;

    if (!name) {
      quasis.push(curString);
      curString = "";
      expressions.push(
        t.callExpression(
          hub.importNamed(attr, "@marko/runtime/helpers", "stringifyAttrs"),
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
          hub.importNamed(attr, "@marko/runtime/helpers", "stringifyAttr"),
          [t.stringLiteral(name), value]
        )
      );
    }
  }

  quasis.push(curString);

  return normalizeTemplateString(quasis, expressions);
}
