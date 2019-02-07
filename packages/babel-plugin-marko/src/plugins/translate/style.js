export default function(path) {
  const { hub, node } = path;

  if (!path.parentPath.isProgram()) {
    throw createError(
      path,
      "Style blocks must be at the root of your Marko template."
    );
  }

  if (hub.componentFiles.styleFile) {
    throw createError(
      path,
      'A Marko file can either have an inline style block, or an external "style.ext" file, but not both.'
    );
  }

  if (hub._componentStyle) {
    throw createError(
      path,
      "A Marko file can only contain a single inline style block."
    );
  }

  hub._componentStyle = node;
  path.remove();
}

function createError(path, msg) {
  const {
    node: { start }
  } = path;
  return path.hub.buildError({ start, end: start + 5 }, msg);
}
