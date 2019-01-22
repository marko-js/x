import * as t from "../../../definitions";
import { replaceInRenderBody, assertNoArgs } from "../../../taglib/core/util";
import { getAttrs, buildEventHandlerArray } from "./util";

// TODO: support transform and other entries.
const TAG_FILE_ENTRIES = ["template", "renderer"];
const TAG_IDENTIFIER_LOOKUPS = new WeakMap();

export default function(path, tagDef) {
  const { hub, node } = path;
  const { options, meta } = hub;
  const { name } = tagDef;
  const { key } = node;
  const relativePath = resolveRelativePath(hub, tagDef);

  assertNoArgs(path);

  if (!relativePath) {
    throw path.buildCodeFrameError(
      `Unable to find entry point for "${name}" tag.`
    );
  }

  let tagIdentifierLookup = TAG_IDENTIFIER_LOOKUPS.get(hub);
  if (!tagIdentifierLookup) {
    TAG_IDENTIFIER_LOOKUPS.set(hub, (tagIdentifierLookup = {}));
  }

  const tagImportIdentifier = hub.importDefault(path, relativePath, name);
  const tagIdentifier =
    tagIdentifierLookup[name] ||
    path.scope.generateUidIdentifier(`${name}_tag`);

  if (!meta.tags.includes(relativePath)) {
    tagIdentifierLookup[name] = tagIdentifier;
    hub.addStaticNode(
      t.variableDeclaration("const", [
        t.variableDeclarator(
          tagIdentifier,
          t.callExpression(
            hub.importNamed(
              path,
              `marko/src/runtime/${options.output}/helpers`,
              "t"
            ),
            [tagImportIdentifier]
          )
        )
      ])
    );
    meta.tags.push(relativePath);
  }

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
