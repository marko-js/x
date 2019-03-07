import * as t from "../../definitions";

export default function(path) {
  const body = path.get("body");
  const firstChild = body[0];
  const lastChild = body[body.length - 1];
  firstChild.insertBefore(t.markoTag(t.stringLiteral("component-globals")));
  lastChild.insertAfter(t.markoTag(t.stringLiteral("await-reorderer")));
  lastChild.insertAfter(t.markoTag(t.stringLiteral("init-components")));
}
