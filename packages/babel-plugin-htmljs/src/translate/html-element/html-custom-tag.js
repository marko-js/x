import { relative } from "path";
import { addDefault } from "@babel/helper-module-imports";
import * as t from "../../definitions";
import { replaceInRenderBody } from "../../taglib/core/util";
import { getAttrs } from "./util";

export default function(path, tagDef) {
  const { hub, node } = path;
  const {
    file: {
      opts: { filename }
    }
  } = hub;
  const { attributeTags } = node;
  const { template, name } = tagDef;
  const relativePath = relative(filename, template);
  const tagIdentifier = addDefault(path, relativePath, {
    nameHint: name
  });

  replaceInRenderBody(
    path,
    t.callExpression(tagIdentifier, [
      getNestedAttrs(node, tagDef, attributeTags),
      t.identifier("out")
    ])
  );
}

function getNestedAttrs(node, tagDef) {
  const nestedTags = tagDef && tagDef.nestedTags;
  const { attributeTags } = node;
  const attrs = getAttrs(node);

  if (!attributeTags) {
    return attrs;
  }

  for (const [name, tagNodes] of Object.entries(attributeTags)) {
    const nestedTagDef = nestedTags && nestedTags[name];

    if (nestedTagDef && nestedTagDef.isRepeated) {
      const { targetProperty } = nestedTagDef;
      // TODO: repeated @tags
    } else {
      if (tagNodes.length > 1) {
        throw path.buildCodeFrameError(
          `Only one "@${name}" tag is allowed here.`
        );
      }

      attrs.properties.push(
        t.objectProperty(
          t.stringLiteral(name),
          getNestedAttrs(tagNodes[0], nestedTagDef)
        )
      );
    }
  }

  return attrs;
}
