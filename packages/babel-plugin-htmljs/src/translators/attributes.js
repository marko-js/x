import * as t from "../definitions";

export function translateAttributes(attrs) {
  const quasis = [];
  const expressions = [];
  let curString = "";

  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    const name = attr.node.name;
    const { confident, value } = attr.get("value").evaluate();

    if (!name) {
      continue; // TODO spread.
    }

    if (confident) {
      if (value == null || value === false) {
        continue;
      }
    }

    curString += ` ${name}`;

    if (confident) {
      if (value === true) {
        continue;
      }

      curString += `=${value}`;
    } else {
      quasis.push(curString + "=");
      expressions.push(value);
      curString = "";
    }
  }

  if (curString !== "") {
    quasis.push(curString);
  }

  if (!expressions.length) {
    return t.stringLiteral(quasis.join(""));
  }

  return t.templateLiteral(
    quasis.map((str, i) =>
      t.templateElement({ raw: str, cooked: str }, i === quasis.length)
    ),
    expressions
  );
}
