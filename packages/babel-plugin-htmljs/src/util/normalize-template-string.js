import * as t from "../definitions";

export default function normalizeTemplateLiteral(quasis, expressions) {
  for (let i = expressions.length; i--; ) {
    let v = expressions[i];
    if (!(i in quasis)) continue;
    if (t.isStringLiteral(v)) v = v.value;
    if (typeof v !== "string") continue;
    expressions.splice(i, 1);
    quasis.splice(i, 2, quasis[i] + v + (quasis[i + 1] || ""));
  }

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
  return t.templateLiteral(
    quasis.map(toTemplateElement),
    expressions.map(toNode)
  );
}

function toTemplateElement(s) {
  return t.templateElement({ cooked: s, raw: s });
}

function toNode(s) {
  if (typeof s === "string") {
    return t.stringLiteral(s);
  }

  return s;
}

function fromTemplateElement(v) {
  return v.value.raw;
}

function isEmptyString(s) {
  return s === "";
}
