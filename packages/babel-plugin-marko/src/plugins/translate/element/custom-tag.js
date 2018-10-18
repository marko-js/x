import * as t from "../../../definitions";
import {
  replaceInRenderBody,
  insertBeforeInRenderBody
} from "../../../taglib/core/util";
import { getAttrs, buildEventHandlerArray } from "./util";

// TODO: support transform and other entries.
const TAG_FILE_ENTRIES = ["template", "renderer"];

export default function(path, tagDef) {
  const { hub, node } = path;
  const { options, meta } = hub;
  const { name } = tagDef;
  const { key } = node;
  const relativePath = resolveRelativePath(hub, tagDef);

  if (!relativePath) {
    throw path.buildCodeFrameError(
      `Unable to find entry point for "${name}" tag.`
    );
  }

  if (!meta.tags.includes(relativePath)) {
    meta.tags.push(relativePath);
  }

  const tagImportIdentifier = hub.importDefault(path, relativePath, name);
  const tagIdentifier = path.scope.generateUidIdentifier(name);

  path.insertBefore(
    t.variableDeclaration("const", [
      t.variableDeclarator(
        tagIdentifier,
        t.callExpression(
          hub.importNamed(path, `marko/src/runtime/${options.output}`, "t"),
          [tagImportIdentifier]
        )
      )
    ])
  );

  replaceInRenderBody(
    path,
    t.callExpression(tagIdentifier, [
      getAttrs(path),
      t.identifier("out"),
      key,
      ...buildEventHandlerArray(path)
    ])
  );
}

function resolveRelativePath(hub, tagDef) {
  for (const entry of TAG_FILE_ENTRIES) {
    if (!tagDef[entry]) continue;
    return hub.resolveRelativePath(tagDef[entry]);
  }
}
