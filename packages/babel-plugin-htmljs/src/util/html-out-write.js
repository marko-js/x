import * as t from "../definitions";
import normalizeTemplateString from "./normalize-quasi";

export default function write(strings, ...expressions) {
  const template = normalizeTemplateString([].concat(strings.raw), expressions);

  if (template) {
    return t.callExpression(
      t.memberExpression(t.identifier("out"), t.identifier("w")),
      [template]
    );
  }
}
