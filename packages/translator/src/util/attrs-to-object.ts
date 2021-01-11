import { types as t, NodePath } from "@marko/babel-types";
import toPropertyName from "./to-property-name";

export default function attrsToObject(
  tag: NodePath<t.MarkoTag>,
  withRenderBody = false
) {
  const { node } = tag;
  let result: t.Expression = t.objectExpression([]);

  for (const attr of node.attributes) {
    const value = attr.value!;

    if (t.isMarkoSpreadAttribute(attr)) {
      result.properties.push(t.spreadElement(value));
    } else {
      result.properties.push(
        t.objectProperty(toPropertyName(attr.name), value)
      );
    }
  }

  if (withRenderBody) {
    let hoistedControlFlows = node.extra.hoistedControlFlows;

    if (hoistedControlFlows) {
      for (const child of tag.get("body").get("body")) {
        tag.insertBefore(child.node);
        child.remove();

        if (child.isConditional() || child.isLoop()) {
          if (!--hoistedControlFlows) {
            break;
          }
        }
      }
    }

    if (tag.node.body.body.length) {
      (result as t.ObjectExpression).properties.push(
        t.objectMethod(
          "method",
          t.identifier("renderBody"),
          tag.node.body.params,
          t.blockStatement(tag.node.body.body)
        )
      );
    }
  }

  if (result.properties.length) {
    if (result.properties.length === 1) {
      const [prop] = result.properties;

      if (t.isSpreadElement(prop)) {
        result = prop.argument;
      }
    }

    return result;
  }
}

export function getRenderBodyProp(
  attrsObject: ReturnType<typeof attrsToObject>
) {
  if (t.isObjectExpression(attrsObject)) {
    // renderBody prop is always added last.
    const lastProp = attrsObject.properties[attrsObject.properties.length - 1];

    if (
      t.isObjectMethod(lastProp) &&
      (lastProp.key as t.Identifier).name === "renderBody"
    ) {
      return lastProp;
    }
  }
}
