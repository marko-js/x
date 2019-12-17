import { types as t } from "@marko/babel-types";

export function exit(path) {
  const body = path.get("body.body");
  const firstChild = body[0];
  const lastChild = body[body.length - 1];
  firstChild.insertBefore(
    t.markoTag(t.stringLiteral("component-globals"), [], t.markoTagBody())
  );
  lastChild.insertAfter(
    t.markoTag(t.stringLiteral("await-reorderer"), [], t.markoTagBody())
  );
  lastChild.insertAfter(
    t.markoTag(t.stringLiteral("init-components"), [], t.markoTagBody())
  );
}
