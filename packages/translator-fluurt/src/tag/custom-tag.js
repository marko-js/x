import { types as t } from "@marko/babel-types";
import { assertNoArgs } from "@marko/babel-utils";
import { getAttrs } from "./util";

const TAG_FILE_ENTRIES = ["template"];

export default function(path, tagDef) {
  const { hub, node } = path;
  const {
    name: { value: name }
  } = node;
  const relativePath = resolveRelativePath(hub, tagDef);

  assertNoArgs(path);

  if (!relativePath) {
    throw path
      .get("name")
      .buildCodeFrameError(
        `Unable to find entry point for custom tag <${name}>.`
      );
  }

  path.replaceWith(
    t.expressionStatement(
      t.callExpression(hub.importDefault(path, relativePath, `${name}_tag`), [
        getAttrs(path)
      ])
    )
  );
}

function resolveRelativePath(hub, tagDef) {
  for (const entry of TAG_FILE_ENTRIES) {
    if (!tagDef[entry]) continue;
    return hub.resolveRelativePath(tagDef[entry]);
  }
}
