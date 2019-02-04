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

  attributes.unshift(
    t.markoAttribute("id", t.stringLiteral(shorthand.value.slice(1, -1)))
  );

  return attributes;
};
