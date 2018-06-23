import * as t from "../definitions";

export default function normalizeTemplateLiteral(quasis, expressions) {
  expressions = expressions
    .reduce(concat, []) // Flatten expressions.
    .filter((v, i, all) => {
      // Extract out "string" like expressions.
      if (t.isStringLiteral(v)) v = v.value;
      if (typeof v !== "string") return true;
      quasis.splice(i, 2, quasis[i] + v + quasis[i + 1]);
    });

  if (!expressions.length) {
    // No expression, just return a literal or empty.
    const literal = quasis.join("");
    return literal === "" ? undefined : t.stringLiteral(literal);
  }

  if (
    expressions.length === 1 &&
    quasis.length === 2 &&
    quasis.every(isEmptyString)
  ) {
    // Only expression `${expr}` just return the expr.
    return expressions[0];
  }

  // Do it.
  return t.templateLiteral(quasis.map(toTemplateElement), expressions);
}

function toTemplateElement(s, i, all) {
  return t.templateElement({ cooked: s, raw: s });
}

function isEmptyString(s) {
  return s === "";
}

function concat(a, b) {
  return a.concat(b);
}
