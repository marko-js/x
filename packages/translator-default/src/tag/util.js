import { types as t } from "@marko/babel-types";
import { getTagDef } from "@marko/babel-utils";

const EMPTY_ARR = [];

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
    return t.nullLiteral();
  }

  const properties = [];
  const targetObjects = {};
  const tagDef = getTagDef(path);
  const foundProperties = {};

  for (let i = 0; i < attrsLen; i++) {
    const { name, value } = attributes[i];

    if (name) {
      const attrDef = tagDef && tagDef.getAttribute(name);
      let targetProperties = properties;
      let targetProperty = name;

      if (attrDef) {
        if (attrDef.targetProperty) {
          const key = attrDef.targetProperty;

          if (attrDef.dynamicAttribute) {
            let targetObject = targetObjects[key];

            if (!targetObject) {
              properties.push(
                t.objectProperty(
                  t.stringLiteral(key),
                  (targetObject = targetObjects[key] = t.objectExpression([]))
                )
              );
            }

            targetProperties = targetObject.properties;
          } else {
            targetProperty = key;
          }
        }
      }

      if (!noCamel) {
        targetProperty = camelCase(targetProperty);
      }

      foundProperties[targetProperty] = true;
      targetProperties.push(
        t.objectProperty(t.stringLiteral(targetProperty), value)
      );
    } else {
      properties.push(t.spreadElement(value));
    }
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
    tagDef.forEachAttribute &&
    tagDef.forEachAttribute(attr => {
      const { name, defaultValue } = attr;
      if (
        !attr.dynamicAttribute &&
        !foundProperties[name] &&
        defaultValue !== undefined
      ) {
        properties.push(
          t.objectProperty(
            t.stringLiteral(name),
            t.stringLiteral(defaultValue + "")
          )
        );
      }
    });

  if (properties.length === 1 && t.isSpreadElement(properties[0])) {
    return properties[0].argument;
  }

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

export function evaluateAttr(attr) {
  const name = attr.get("name").node;
  const value = attr.get("value");
  let confident = false;
  let computed = undefined;

  if (name && name !== "data-marko") {
    if (value.isRegExpLiteral()) {
      confident = true;
      computed = value.get("pattern").node;
    } else {
      const evaluated = value.evaluate();
      ({ confident, value: computed } = evaluated);

      if (computed === true) {
        computed = "";
      } else if (computed != null && computed !== false) {
        if (typeof computed === "object") {
          computed = JSON.stringify(computed);
        } else {
          computed = computed + "";
        }
      }
    }
  }

  return {
    confident,
    computed
  };
}

function camelCase(string) {
  return string.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}
