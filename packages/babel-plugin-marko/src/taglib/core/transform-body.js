import * as t from "../../definitions";

export default function(path) {
  const body = path.get("body");
  body[0].insertBefore(t.markoTag(t.stringLiteral("component-globals")));
  body[body.length - 1].insertAfter(
    t.markoTag(t.stringLiteral("init-components"))
  );
}
