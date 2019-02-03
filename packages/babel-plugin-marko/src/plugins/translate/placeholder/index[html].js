import * as t from "../../../definitions";
import write from "../../../util/html-out-write";
import withPreviousLocation from "../../../util/with-previous-location";
import { replaceInRenderBody } from "../../../taglib/core/util";

const EMPTY_OBJECT = {};
const ESCAPE_TYPES = {
  html: {
    name: "x",
    alias: "marko_escapeXml"
  },
  script: {
    name: "xs",
    alias: "marko_escapeScript"
  },
  style: {
    name: "xc",
    alias: "marko_escapeStyle"
  }
};

export default function(path) {
  const { node, hub } = path;
  let { escape, value } = node;

  if (escape) {
    const tagName = findParentTagName(path);
    const escapeType = ESCAPE_TYPES[tagName] || ESCAPE_TYPES.html;
    value = t.callExpression(
      hub.importNamed(
        path,
        "marko/src/runtime/html/helpers",
        escapeType.name,
        escapeType.alias
      ),
      [value]
    );
  }

  replaceInRenderBody(path, withPreviousLocation(write`${value}`, node));
}

function findParentTagName(path) {
  while ((path = path.parentPath)) {
    if (t.isProgram(path.node)) {
      return;
    }

    if (t.isHTMLTag(path.node)) {
      const { tagDef = EMPTY_OBJECT } = path.node;
      return (
        tagDef.html &&
        path.get("name").get("value").node
      );
    }
  }
}
