import { types as t } from "@marko/babel-types";
import { escapeXmlAttr } from "marko/src/runtime/html/escape";
import { getTagDef } from "@marko/babel-utils";

const EMPTY_ARR = [];

function getPropertyKey(name, noCamel, tagDef) {
  const attribute = (tagDef && tagDef.getAttribute(name)) || {};
  let currentKey = name;
  if (attribute.targetProperty && !attribute.dynamicAttribute) {
    currentKey = attribute.targetProperty;
  }
  return noCamel ? currentKey : camelCase(currentKey);
}

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
  const tagDef = getTagDef(path);
  const foundProperties = {};

  for (let i = 0; i < attrsLen; i++) {
    const { name, value } = attributes[i];
    foundProperties[name] = true;
    properties[i] = name
      ? t.objectProperty(
          t.stringLiteral(getPropertyKey(name, noCamel, tagDef)),
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
            [t.identifier("out"), ...(node.params || EMPTY_ARR)],
            t.blockStatement(body)
          )
        )
      );
    }
  }

  // Default parameters
  tagDef &&
    tagDef.forEachAttribute(attr => {
      const { name, defaultValue } = attr;
      if (!attr.dynamicAttribute && !foundProperties[name] && defaultValue) {
        properties.push(
          t.objectProperty(
            t.stringLiteral(name),
            t.stringLiteral(escapeXmlAttr(defaultValue))
          )
        );
      }
    });
  return t.objectExpression(properties);
}

export function buildEventHandlerArray(path) {
  const { handlers } = path.node;
  if (!handlers) {
    return [];
  }

  return [
    t.arrayExpression(
      Object.entries(handlers).reduce(
        (props, [eventName, { arguments: args, once }]) => {
          props.push(
            t.stringLiteral(eventName),
            args[0],
            t.booleanLiteral(once)
          );

          if (args.length > 1) {
            props.push(t.arrayExpression(args.slice(1)));
          }

          return props;
        },
        []
      )
    )
  ];
}

function camelCase(string) {
  return string.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}
