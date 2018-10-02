import * as t from "../../definitions";

export default function(path) {
  const { node, hub } = path;
  const { startTag } = node;
  const { rawValue: code, start } = startTag;

  if (hub.componentFiles.componentFile) {
    throw path.buildCodeFrameError(
      'A Marko file can either have an inline class, or an external "component.js", but not both.'
    );
  }

  if (hub._componentClass) {
    throw path.buildCodeFrameError(
      "A Marko component can only have one top level class."
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
