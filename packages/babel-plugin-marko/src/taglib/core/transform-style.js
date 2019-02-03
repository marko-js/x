import { basename } from "path";
import { assertIsRoot } from "./util";
const STYLE_REG = /^style(?:\.([^\s]+))?\s*\{([\s\S]*)}$/;

export default function(path) {
  const { node, hub } = path;
  const { rawValue } = node;
  const base = basename(hub.filename);
  const matchedBlock = STYLE_REG.exec(rawValue);

  if (!matchedBlock) {
    return;
  }

  if (hub.componentFiles.styleFile) {
    throw path
      .get("name")
      .buildCodeFrameError(
        'A Marko file can either have an inline style block, or an external "style.ext" file, but not both.'
      );
  }

  assertIsRoot(path);

  const [, type = "css", code] = matchedBlock;
  hub.meta.deps.push({
    type,
    code: code.trim(),
    path: `./${base}`,
    virtualPath: `./${base}.${type}`
  });

  path.remove();
}
