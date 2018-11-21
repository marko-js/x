import * as t from "../../definitions";

export default function(path) {
  const {
    hub,
    node: {
      body: { body }
    }
  } = path;

  if (hub._componentClass) {
    throw path.buildCodeFrameError(
      "A Marko component can only have one top level class."
    );
  }

  hub._componentClass = t.objectExpression(
    body.map(prop => {
      if (t.isClassMethod(prop)) {
        prop.type = "ObjectMethod";
      } else if (t.isClassProperty(prop)) {
        prop.type = "ObjectProperty";
      } else {
        // TODO support classProperties and move them into the onCreate method.
        throw hub.buildError(prop, "Unsupported class property on component.");
      }

      return prop;
    })
  );

  path.remove();
}
