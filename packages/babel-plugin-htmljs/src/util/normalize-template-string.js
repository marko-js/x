import * as t from "../definitions";

export default function normalizeTemplateLiteral(quasis, expressions) {
  for (let i = expressions.length; i--; ) {
    let v = expressions[i];
    if (t.isTemplateLiteral(v)) {
      quasis[i] += v.quasis[0].value.raw;
      quasis[i + 1] = v.quasis[v.quasis.length - 1].value.raw + quasis[i + 1];
      quasis.splice(i, 0, ...v.quasis.slice(1, -1).map(fromTemplateElement));
      expressions.splice(i, 1, ...v.expressions);
      i += v.expressions.length;
      continue;
    }
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

function fromTemplateElement(node) {
  return node.value.raw;
}

function toNode(s) {
  if (typeof s === "string") {
    return t.stringLiteral(s);
  }

  return s;
}

function isEmptyString(s) {
  return s === "";
}
