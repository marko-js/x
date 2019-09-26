import { types as t } from "@marko/babel-types";
import { normalizeTemplateString } from "@marko/babel-utils";
import { xa as escapeXmlAttr } from "marko/src/runtime/html/helpers";

const EVENT_REG = /^(on(?:ce)?)([A-Z].*)$/;
const basicTypes = ["string", "number", "boolean"];

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
      hasSpread = hasSpread || attr.type === 'MarkoSpreadAttribute';
      attrsObject.properties.push(t.spreadElement(value));
      continue;
    }

    if (EVENT_REG.test(name)) {
      // Maybe this is bad, but in theory you should
      // not use events server side.
      continue;
    }

    const { confident, value: computed } = attr.get("value").evaluate();

    if (
      confident &&
      basicTypes.includes(typeof computed)
    ) {
      if (computed == null || computed === false) {
        continue;
      }

      curString += ` ${name}`;

      if (computed !== true) {
        curString += `="${escapeXmlAttr(computed)}"`;
      }
      attrsObject.properties.push(t.objectProperty(t.stringLiteral(name), t.stringLiteral(escapeXmlAttr(computed))));
    } else {
      const args = [t.stringLiteral(name), value];
      quasis.push(curString);
      curString = "";

      if (name === "data-marko") {
        args.push(t.booleanLiteral(false));
      }

      attrsObject.properties.push(t.objectProperty(t.stringLiteral(name), value));

      expressions.push(
        t.callExpression(
          hub.importNamed(
            attr,
            "marko/src/runtime/html/helpers",
            "a",
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
            "marko/src/runtime/html/helpers",
            "as",
            "marko_attrs"
          ),
          [attrsObject]
      );
  } else {
    return normalizeTemplateString(quasis, ...expressions);
  }
}
