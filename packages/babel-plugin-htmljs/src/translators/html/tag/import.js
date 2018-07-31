import * as t from "../../../definitions";

export default translate;
translate.options = {
  html: { relaxRequireCommas: true },
  rawOpenTag: true
};

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
  const { rawValue, start } = startTag;
  const [importNode] = parse(rawValue, start).body;
  path.replaceWith(importNode);
}
