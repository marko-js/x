import * as t from "../definitions";

export default (hub, shorthand, attributes) => {
  if (!shorthand) {
    return attributes;
  }

  // TODO: need to expose id shorthand location in HTMLJSParser.
  // TODO: needs to handle dynamic id shorthand.

  const idAttr = attributes.find(({ name }) => name === "id");
  if (idAttr) {
    throw hub.buildError(idAttr, "Cannot have shorthand id and id attribute.");
  }

  const idParts = shorthand.rawParts.map(part =>
    part.expression
      ? hub.parseExpression(part.expression, part.pos)
      : hub.createNode("stringLiteral", part.pos, part.endPos, part.text)
  );

  attributes.unshift(
    t.markoAttribute(
      "id",
      idParts.length === 1
        ? idParts[0]
        : idParts.reduce((a, b) => t.binaryExpression("+", a, b))
    )
  );

  return attributes;
};
