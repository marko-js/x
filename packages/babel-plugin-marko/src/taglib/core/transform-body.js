import * as t from "../../definitions";

export default function(path) {
  const body = path.get("body");
  body[0].insertBefore(t.htmlTag(t.stringLiteral("component-globals")));
  body[body.length - 1].insertAfter(
    t.htmlTag(t.stringLiteral("init-components"))
  );
}
