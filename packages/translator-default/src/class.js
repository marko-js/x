import { types as t } from "@marko/babel-types";

export default function(path) {
  const {
    hub,
    node: {
      body: { body }
    }
  } = path;

  const classProperties = [];
  let onCreateMethod = body.find(
    prop =>
      prop.computed === false &&
      t.isIdentifier(prop.key) &&
      prop.key.name === "onCreate"
  );

  const objectProperties = body
    .map(prop => {
      if (t.isClassMethod(prop)) {
        prop.type = "ObjectMethod";
      } else if (t.isClassProperty(prop) && !prop.static) {
        classProperties.push(
          t.assignmentExpression(
            "=",
            t.memberExpression(t.thisExpression(), prop.key, prop.computed),
            prop.value
          )
        );

        return undefined;
      } else {
        throw hub.buildError(prop, "Unsupported class property on component.");
      }

      return prop;
    })
    .filter(Boolean);

  if (classProperties.length) {
    if (!onCreateMethod) {
      objectProperties.push(
        (onCreateMethod = t.objectMethod(
          "method",
          t.identifier("onCreate"),
          [],
          t.blockStatement([])
        ))
      );
    }

    onCreateMethod.body.body.unshift(...classProperties);
  }

  hub.inlineComponentClass = t.objectExpression(objectProperties);
  path.remove();
}
