import * as t from "../../../definitions";

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

  const { node, hub } = path;
  const { startTag } = node;
  const { rawValue } = startTag;
  const code = rawValue.replace(/^static\s*/, "").trim();
  const start = startTag.start + (rawValue.length - code.length);
  let { body } = hub.parse(code, start);
  if ((body.length === 1) & t.isBlockStatement(body[0])) {
    body = body[0].body;
  }

  path.replaceWithMultiple(body);
}