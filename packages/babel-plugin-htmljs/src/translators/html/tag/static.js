import * as t from "../../../definitions";
import withPreviousLocation from "../../../util/with-previous-location";

export default translate;
translate.options = {
  html: { ignoreAttributes: true },
  rawOpenTag: true
};

// WIP
function translate(path) {
  const program = path.parent;
  if (!t.isProgram(program)) {
    throw path.buildCodeFrameError(
      "static must be at the root of your Marko template."
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
  let code = rawValue.replace(/^static\s*/, "").trim();

  if (code[0] === "{") {
    code = code.slice(1, -1);
  }

  try {
    path.replaceWithMultiple(withPreviousLocation(parse(code, 0), node).body);
  } catch (err) {
    // TODO: move parsing error handling somewhere else.
    // Also could be improved with better location info.
    throw path.buildCodeFrameError(err.message);
  }
}
