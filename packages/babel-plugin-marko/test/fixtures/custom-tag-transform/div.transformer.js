import * as t from "../../../src/definitions";

export function enter(path) {
  path.pushContainer(
    "attributes",
    t.markoAttribute("style", t.stringLiteral("display:block"))
  );
}

export function exit(path) {
  path.replaceWith(
    t.markoTag(
      t.stringLiteral("span"),
      path.get("attributes").map(p => p.node),
      t.markoTagBody(path.get("body.body").map(p => p.node)),
      path.get("params").map(p => p.node),
      path.get("arguments").map(p => p.node)
    )
  );
}
