import { types as t } from "@marko/babel-types";
import normalizeComputedExpression from "../util/get-computed-expression";

// TODO: this will need to return ComputedSignals
export function getAttrs(path, noCamel, skipRenderBody) {
  const { node } = path;
  const {
    attributes,
    attributeTags,
    body: { body },
    hasDynamicAttributeTags
  } = node;
  let i;
  const attrsLen = attributes.length;
  const childLen = body.length;
  const hasRenderBody = !skipRenderBody && childLen;

  if (!attrsLen && !hasRenderBody && !attributeTags) {
    return t.objectExpression([]);
  }

  const properties = new Array(attrsLen);

  for (i = 0; i < attrsLen; i++) {
    const { name, value } = attributes[i];
    properties[i] = name
      ? t.objectProperty(
          t.stringLiteral(noCamel ? name : camelCase(name)),
          value
        )
      : t.spreadElement(value);
  }

  if (!skipRenderBody && childLen) {
    if (hasDynamicAttributeTags) {
      path.insertBefore(body);
    } else {
      properties.push(
        t.objectProperty(
          t.stringLiteral("renderBody"),
          t.arrowFunctionExpression(node.params, body)
        )
      );
    }
  }

  const object = t.objectExpression(properties);

  if (properties.some(prop => t.isSpreadElement(prop))) {
    return normalizeComputedExpression(object);
  }

  for (i = properties.length; i--; ) {
    const prop = properties[i];
    prop.value = normalizeComputedExpression(prop.value);
  }

  return object;
}

function camelCase(string) {
  return string.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}
