import * as t from "../../../definitions";

export function toStatement(node) {
  if (t.isExpression(node)) {
    return t.expressionStatement(node);
  }

  return node;
}

export function strictAttributes(path, allowed) {
  const {
    node: { startTag }
  } = path;
  startTag.attributes.forEach((attr, i) => {
    if (!allowed.includes(attr.name)) {
      throw path
        .get(`startTag.attributes.${i}`)
        .buildCodeFrameError(
          `Invalid "${startTag.name}" tag attribute: "${attr.name}".`
        );
    }
  });
}
