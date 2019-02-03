import * as t from "../../../definitions";
import {
  toStatement,
  insertBeforeInRenderBody
} from "../../../taglib/core/util";

export function getAttrs(path, skipRenderBody) {
  const { node } = path;
  const { attributes, attributeTags, body, hasDynamicAttributeTags } = node;
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
      ? t.objectProperty(t.stringLiteral(name), value)
      : t.spreadElement(value);
  }

  if (!skipRenderBody && childLen) {
    if (hasDynamicAttributeTags) {
      // TODO: throw error if content mixed with @tags.
      insertBeforeInRenderBody(path, body);
    } else {
      properties.push(
        t.objectProperty(
          t.stringLiteral("renderBody"),
          t.arrowFunctionExpression(
            [t.identifier("out"), ...node.params],
            t.blockStatement(body.map(toStatement))
          )
        )
      );
    }
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
