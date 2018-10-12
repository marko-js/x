import * as t from "../../../../definitions";

/**
 * Does nothing in html mode.
 */
export default function(path, attr) {
  const { node } = path;
  const { properties } = node;
  let prop = properties.find(({ key: { name } }) => name === "noupdate");

  if (!prop) {
    prop = t.objectProperty(t.identifier("noupdate"), t.arrayExpression([]));
    properties.push(prop);
  }

  prop.value.elements.push(t.stringLiteral(attr.node.name));
}
