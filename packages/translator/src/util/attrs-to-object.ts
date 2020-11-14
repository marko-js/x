import {
  types as t,
  NodePath,
  Expression,
  SpreadElement,
  MarkoTag
} from "@marko/babel-types";

export default function attrsToObject(tag: NodePath<MarkoTag>) {
  let result: Expression = t.objectExpression([]);

  for (const attr of tag.node.attributes) {
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
    result = (result.properties[0] as SpreadElement).argument;
  }

  return result;
}
