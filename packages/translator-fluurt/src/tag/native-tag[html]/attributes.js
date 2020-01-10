import { types as t } from "@marko/babel-types";
import { normalizeTemplateString } from "@marko/babel-utils";
import { attr as escapeAttr } from "fluurt/html";

const EVENT_REG = /^(on(?:ce)?)([A-Z].*)$/;

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

    if (EVENT_REG.test(name)) {
      // Maybe this is bad, but in theory you should
      // not use events server side.
      continue;
    }

    const { confident, value: computed } = attr.get("value").evaluate();

    if (confident) {
      curString += escapeAttr(name, computed);

      if (computed != null && computed !== false) {
        attrsObject.properties.push(
          t.objectProperty(t.stringLiteral(name), value)
        );
      }
    } else {
      const args = [t.stringLiteral(name), value];
      quasis.push(curString);
      curString = "";

      attrsObject.properties.push(
        t.objectProperty(t.stringLiteral(name), value)
      );

      expressions.push(
        t.callExpression(hub.importNamed(attr, "fluurt/html", "attr"), args)
      );
    }
  }

  quasis.push(curString);

  if (hasSpread) {
    return t.callExpression(
      path.hub.importNamed(path, "fluurt/html", "attrs"),
      [attrsObject]
    );
  } else if (expressions.length) {
    return normalizeTemplateString(quasis, ...expressions);
  } else {
    return t.stringLiteral(quasis.join(""));
  }
}
