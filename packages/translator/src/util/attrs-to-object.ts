import { types as t, NodePath } from "@marko/babel-types";

export default function attrsToObject(tag: NodePath<t.MarkoTag>) {
  const { node } = tag;
  let result: t.Expression = t.objectExpression([]);

  for (const attr of node.attributes) {
    const value = attr.value!;

    if (t.isMarkoSpreadAttribute(attr)) {
      result.properties.push(t.spreadElement(value));
    } else {
      result.properties.push(
        t.objectProperty(t.stringLiteral(attr.name), value)
      );
    }
  }

  if (result.properties.length === 1) {
    const [prop] = result.properties;

    if (t.isSpreadElement(prop)) {
      result = prop.argument;
    }
  }

  return result;
}
