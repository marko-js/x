import { types as t } from "@marko/babel-types";
import withPreviousLocation from "../util/with-previous-location";

export default function(path) {
  const { node, hub } = path;
  const { rawValue: code, start } = node;

  if (hub.componentFiles.componentFile) {
    throw path
      .get("name")
      .buildCodeFrameError(
        'A Marko file can either have an inline class, or an external "component.js", but not both.'
      );
  }

  if (hub._componentClass) {
    throw path
      .get("name")
      .buildCodeFrameError(
        "A Marko component can only have one top level class."
      );
  }

  const parsed = hub.parseExpression(code, start);

  if (parsed.id) {
    throw hub.buildError(parsed.id, "Component class cannot have a name.");
  }

  if (parsed.superClass) {
    throw hub.buildError(
      parsed.superClass,
      "Component class cannot have a super class."
    );
  }

  const constructorProp = parsed.body.body.find(
    prop => t.isClassMethod(prop) && prop.kind === "constructor"
  );
  if (constructorProp) {
    throw hub.buildError(
      constructorProp.key,
      "The constructor method should not be used for a component, use onCreate instead."
    );
  }

  hub._componentClass = true;
  hub.isImplicit = false;
  path.replaceWith(withPreviousLocation(t.markoClass(parsed.body), node));
}
