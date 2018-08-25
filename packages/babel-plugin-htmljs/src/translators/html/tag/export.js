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
      "Export's must be at the root of your Marko template."
    );
  }

  const { node, hub } = path;
  const { startTag } = node;
  const { rawValue, start } = startTag;
  const [exportNode] = hub.parse(rawValue, start).body;
  path.replaceWith(exportNode);
}
