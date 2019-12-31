import { types as t } from "@marko/babel-types";
import { normalizeTemplateString } from "@marko/babel-utils";
import { d as escapeDoubleQuoteAttr } from "marko/src/runtime/html/helpers/escape-xml";
import { evaluateAttr } from "../util";

export default function(path, attrs) {
  if (!attrs.length) {
    return t.stringLiteral("");
  }

  const quasis = [];
  const expressions = [];
  let curString = "";

  let attrsObject = t.objectExpression([]);
  let hasSpread = false;

  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    const {
      hub,
      node: { name, value }
    } = attr;

    if (!name) {
      quasis.push(curString);
      curString = "";
      hasSpread = hasSpread || attr.type === "MarkoSpreadAttribute";
      attrsObject.properties.push(t.spreadElement(value));
      continue;
    }

    const { confident, computed } = evaluateAttr(attr);

    if (confident) {
      if (computed == null || computed === false) {
        continue;
      }

      curString += ` ${name}`;

      if (computed === "") {
        attrsObject.properties.push(
          t.objectProperty(t.stringLiteral(name), t.booleanLiteral(true))
        );
      } else {
        curString += `="${escapeDoubleQuoteAttr(computed)}"`;
        attrsObject.properties.push(
          t.objectProperty(
            t.stringLiteral(name),
            value
          )
        );
      }
    } else {
      const args = [t.stringLiteral(name), value];
      quasis.push(curString);
      curString = "";

      if (name === "data-marko") {
        args.push(t.booleanLiteral(false));
      }

      attrsObject.properties.push(
        t.objectProperty(t.stringLiteral(name), value)
      );

      expressions.push(
        t.callExpression(
          hub.importNamed(
            attr,
            "marko/src/runtime/html/helpers/attr",
            "marko_attr"
          ),
          args
        )
      );
    }
  }
  quasis.push(curString);
  if (hasSpread) {
    return t.callExpression(
      path.hub.importNamed(
        path,
        "marko/src/runtime/html/helpers/attrs",
        "marko_attrs"
      ),
      [
        attrsObject.properties.length === 1
          ? attrsObject.properties[0].argument
          : attrsObject
      ]
    );
  } else if (expressions.length) {
    return normalizeTemplateString(quasis, ...expressions);
  } else {
    return t.stringLiteral(quasis.join(""));
  }
}
