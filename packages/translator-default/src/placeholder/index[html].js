import { types as t } from "@marko/babel-types";
import write from "../util/html-out-write";
import withPreviousLocation from "../util/with-previous-location";

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
  } else {
    value = t.callExpression(
      hub.importNamed(path, "marko/src/runtime/html/helpers", "s"),
      [value]
    );
  }

  path.replaceWith(withPreviousLocation(write`${value}`, node));
}

function findParentTagName(path) {
  while ((path = path.parentPath)) {
    if (path.isProgram()) {
      return;
    }

    if (path.isMarkoTag()) {
      const { tagDef = EMPTY_OBJECT } = path.node;
      return tagDef.html && path.get("name").get("value").node;
    }
  }
}
