import { types as t } from "@marko/babel-types";
import {
  xml as escapeXML,
  style as escapeStyle,
  script as escapeScript
} from "fluurt/html";
import write from "../util/html-write";

const EMPTY_OBJECT = {};
const ESCAPE_TYPES = {
  html: "xml",
  style: "style",
  script: "script"
};
const ESCAPE_FNS = {
  html: escapeXML,
  style: escapeStyle,
  script: escapeScript
};

export default function(path) {
  const { node, hub } = path;
  let { escape, value } = node;

  if (escape) {
    const tagName = findParentTagName(path);
    const escapeType = ESCAPE_TYPES[tagName] || ESCAPE_TYPES.html;
    const { confident, computed } = path.get("value").evaluate();

    if (confident) {
      const result = (ESCAPE_FNS[escapeType] || ESCAPE_FNS.html)(computed);
      if (result === "") {
        path.remove();
        return;
      }

      value = t.stringLiteral(result);
    } else {
      value = t.callExpression(
        hub.importNamed(path, "fluurt/html", escapeType),
        [value]
      );
    }
  }

  path.replaceWith(write(path)`${value}`);
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
