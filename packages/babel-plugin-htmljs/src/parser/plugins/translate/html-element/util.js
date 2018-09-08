import * as t from "../../../../definitions";
import { toStatement } from "../../../../taglib/core/util";

export function getAttrs(node) {
  const { startTag, children } = node;
  const { attributes } = startTag;
  const attrsLen = attributes.length;
  const childLen = children.length;

  if (!attrsLen && !childLen) {
    return t.nullLiteral();
  }

  const properties = new Array(attrsLen);

  for (let i = 0; i < attrsLen; i++) {
    const { name, value } = attributes[i];
    properties[i] = name
      ? t.objectProperty(t.stringLiteral(name), value)
      : t.spreadElement(value);
  }

  if (childLen) {
    properties.push(
      t.objectProperty(
        t.stringLiteral("renderBody"),
        t.arrowFunctionExpression(
          [t.identifier("out")],
          t.blockStatement(children.map(toStatement))
        )
      )
    );
  }

  return t.objectExpression(properties);
}
