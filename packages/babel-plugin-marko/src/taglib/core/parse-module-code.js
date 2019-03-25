import nodePath from "path";
import resolveFrom from "resolve-from";

const startOffset = "module-code".length;

export default function parse(path) {
  const {
    hub,
    node: { rawValue, start }
  } = path;
  const dirname = nodePath.dirname(hub.filename);
  const relativeRequire = entry => require(resolveFrom(dirname, entry));
  const fn = eval(rawValue.slice(startOffset));
  const source = fn(relativeRequire);
  const program = hub.parse(source, start + startOffset);
  const programPath = path.parentPath;

  if (programPath.node.body.length > 1) {
    throw path.buildCodeFrameError(
      "<module-code> tag should exist only by itself"
    );
  }

  program.body.forEach(node => path.insertBefore(node));
  path.remove();
  hub.isModuleCode = true;
}
