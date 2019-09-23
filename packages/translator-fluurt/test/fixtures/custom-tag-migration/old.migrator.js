import { types as t } from "@marko/babel-types";

export function enter(path) {
  const oldAttr = path
    .get("attributes")
    .find(attrPath => attrPath.get("name").node === "a");

  if (oldAttr) {
    oldAttr.replaceWith(t.markoAttribute("b", oldAttr.get("value").node));
  }
}

export function exit(path) {
  path.replaceWith(
    t.markoTag(
      t.stringLiteral("new"),
      path.get("attributes").map(p => p.node),
      t.markoTagBody(path.get("body.body").map(p => p.node)),
      path.get("params").map(p => p.node),
      path.get("arguments").map(p => p.node)
    )
  );
}
