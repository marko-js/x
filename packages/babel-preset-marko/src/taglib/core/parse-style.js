import { basename } from "path";
const STYLE_REG = /^style(?:\.([^\s]+))?\s*\{([\s\S]*)}$/;

export default function(path) {
  const { node, hub } = path;
  const { startTag } = node;
  const { rawValue } = startTag;
  const base = basename(hub.filename);
  const matchedBlock = STYLE_REG.exec(rawValue);

  if (!matchedBlock) {
    return node;
  }

  if (hub.componentFiles.styleFile) {
    throw path.buildCodeFrameError(
      'A Marko file can either have an inline style block, or an external "style.ext" file, but not both.'
    );
  }

  const [, type = "css", code] = matchedBlock;
  hub.meta.deps.push({
    type,
    code: code.trim(),
    path: `./${base}`,
    virtualPath: `./${base}.${type}`
  });
}
