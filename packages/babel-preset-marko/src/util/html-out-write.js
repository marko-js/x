import * as t from "../definitions";
import normalizeTemplateString from "./normalize-template-string";

export default function write(strings, ...expressions) {
  const template = normalizeTemplateString(strings.slice(), expressions);

  if (template) {
    return Object.assign(
      t.callExpression(
        t.memberExpression(t.identifier("out"), t.identifier("w")),
        [template]
      )
    );
  }
}
