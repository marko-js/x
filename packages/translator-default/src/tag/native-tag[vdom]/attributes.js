import { types as t } from "@marko/babel-types";

export default function(path, attrs) {
  if (!attrs.length) {
    return t.stringLiteral("");
  }

  const quasis = [];
  let curString = "";

  let attrsObject = t.objectExpression([]);
  let hasSpread = false;

  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    const {
      node: { name, value }
    } = attr;

    if (!name) {
      quasis.push(curString);
      curString = "";
      hasSpread = hasSpread || attr.type === 'MarkoSpreadAttribute';
      attrsObject.properties.push(t.spreadElement(value));
    }

  }
  quasis.push(curString);

  if (hasSpread) {
    return t.callExpression(
      path.hub.importNamed(
            path,
            "marko/src/runtime/vdom/helpers",
            "as",
            "marko_attrs"
          ),
          [attrsObject]
      );
  } else {
    return t.stringLiteral(quasis.join(""));
  }
}
