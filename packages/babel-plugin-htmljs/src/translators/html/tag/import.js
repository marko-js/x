import * as t from "../../../definitions";
import withPreviousLocation from "../../../util/with-previous-location";

export default translate;
translate.options = {
  html: { relaxRequireCommas: true },
  rawOpenTag: true
};

// WIP
function translate(path) {
  const program = path.parent;
  if (!t.isProgram(program)) {
    throw path.buildCodeFrameError(
      "Import's must be at the root of your Marko template."
    );
  }

  const {
    node,
    hub: {
      file: {
        ast: { parse }
      }
    }
  } = path;
  const { startTag } = node;
  const { rawValue } = startTag;
  const [importNode] = parse(rawValue, startTag.start).body;
  path.replaceWith(withPreviousLocation(importNode, node));
}
