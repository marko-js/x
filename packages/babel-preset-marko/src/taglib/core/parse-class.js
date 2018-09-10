import * as t from "../../definitions";

export default function(path) {
  const { node, hub } = path;
  const { startTag } = node;
  const { rawValue: code, start } = startTag;

  if (hub._componentClass) {
    throw path.buildCodeFrameError(
      "A Marko component can only have one top level class."
    );
  }

  if (hub._componentClass) {
    throw path.buildCodeFrameError(
      "You can only have one top level class for a component."
    );
  }

  const classBody = hub.parseExpression(code, start).body.body;
  hub._componentClass = t.objectExpression(
    classBody.map(prop => {
      if (t.isClassMethod(prop)) {
        if (prop.kind === "constructor") {
          throw hub.buildError(
            prop,
            "The constructor method should not be used for a component, use onCreate instead."
          );
        }
        prop.type = "ObjectMethod";
      } else if (t.isClassProperty(prop)) {
        prop.type = "ObjectProperty";
      } else {
        throw hub.buildError(prop, "Unsupported class property on component.");
      }

      return prop;
    })
  );

  return;
}
