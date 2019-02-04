import * as t from "../definitions";

export default (hub, shorthands, attributes) => {
  if (!shorthands) {
    return attributes;
  }

  // TODO: need to expose class shorthand locations in HTMLJSParser.
  // TODO: needs to handle dynamic class shorthands.
  const classAttr = attributes.find(({ name }) => name === "class");
  const classes = shorthands.map(({ value }) => value.slice(1, -1)).join(" ");

  if (classAttr) {
    if (t.isStringLiteral(classAttr.value)) {
      classAttr.value = t.stringLiteral(`${classes} ${classAttr.value.value}`);
    } else {
      classAttr.value = t.arrayExpression([
        t.stringLiteral(classes),
        classAttr.value
      ]);
    }
  } else {
    attributes.unshift(t.markoAttribute("class", t.stringLiteral(classes)));
  }

  return attributes;
};
