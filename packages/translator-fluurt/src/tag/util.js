import { types as t } from "@marko/babel-types";
import getComputedExpression from "../util/get-computed-expression";

// TODO: this will need to return ComputedSignals
export function getAttrs(path, noCamel, skipRenderBody) {
  const { node } = path;
  const {
    attributes,
    attributeTags,
    body: { body },
    hasDynamicAttributeTags
  } = node;
  const attrsLen = attributes.length;
  const childLen = body.length;
  const hasRenderBody = !skipRenderBody && childLen;

  if (!attrsLen && !hasRenderBody && !attributeTags) {
    return t.objectExpression([]);
  }

  const properties = new Array(attrsLen);

  for (let i = 0; i < attrsLen; i++) {
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
          t.arrowFunctionExpression(
            node.params,
            childLen === 1 ? body[0] : t.blockStatement(body)
          )
        )
      );
    }
  }

  return t.objectExpression(properties);
}

export function normalizePropsObject(path) {
  const props = path.get("properties");
  const hasSpreadAttributes = props.some(prop => prop.isSpreadElement());

  if (hasSpreadAttributes) {
    if (props.length === 1) {
      path.replaceWith(props[0].get("argument").node);
    } else {
      const computedProps = getComputedExpression(path);
      if (computedProps) {
        path.replaceWith(computedProps);
      }
    }
  } else {
    props.forEach(prop => {
      const propValue = prop.get("value");
      const computedPropValue = getComputedExpression(propValue);
      if (computedPropValue) {
        propValue.replaceWith(computedPropValue);
      }
    });
  }
}

function camelCase(string) {
  return string.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}
