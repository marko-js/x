const STYLE_REG = /^style(?:\.([^\s]+))?\s*\{([\s\S]*)}$/;
const STYLE_FOUND = new WeakSet();

export default function(path) {
  const { hub, node } = path;
  const { rawValue } = node;
  const matchedBlock = STYLE_REG.exec(rawValue);
  if (!matchedBlock) {
    return;
  }

  if (!path.parentPath.isProgram()) {
    throw path
      .get("name")
      .buildCodeFrameError(
        "Style blocks must be at the root of your Marko template."
      );
  }

  if (STYLE_FOUND.has(hub)) {
    throw path
      .get("name")
      .buildCodeFrameError(
        "A Marko file can only contain a single inline style block."
      );
  }

  const [, type = "css", code] = matchedBlock;
  node._styleType = type;
  node._styleCode = code;
  path.get("attributes").forEach(attr => attr.remove());
  STYLE_FOUND.add(hub);
}
