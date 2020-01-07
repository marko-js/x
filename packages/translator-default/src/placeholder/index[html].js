import { types as t } from "@marko/babel-types";
import write from "../util/html-out-write";
import withPreviousLocation from "../util/with-previous-location";

const EMPTY_OBJECT = {};
const ESCAPE_TYPES = {
  html: {
    name: "x",
    module: "marko/src/runtime/html/helpers/escape-xml",
    alias: "marko_escapeXml"
  },
  script: {
    module: "marko/src/runtime/html/helpers/escape-script-placeholder",
    alias: "marko_escapeScript"
  },
  style: {
    module: "marko/src/runtime/html/helpers/escape-style-placeholder",
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
      escapeType.name
        ? hub.importNamed(
            path,
            escapeType.module,
            escapeType.name,
            escapeType.alias
          )
        : hub.importDefault(path, escapeType.module, escapeType.alias),
      [value]
    );
  } else {
    value = t.callExpression(
      hub.importDefault(path, "marko/src/runtime/helpers/to-string", "marko_to_string"),
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
