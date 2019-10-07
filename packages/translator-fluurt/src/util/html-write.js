import { types as t } from "@marko/babel-types";
import { normalizeTemplateString } from "@marko/babel-utils";

export default function write(path) {
  return (strings, ...expressions) => {
    return t.expressionStatement(
      t.callExpression(path.hub.importNamed(path, "fluurt/html", "write"), [
        normalizeTemplateString(strings, ...expressions)
      ])
    );
  };
}
