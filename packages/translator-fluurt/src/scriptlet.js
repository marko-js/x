export default function(path) {
  const { node } = path;

  if (node.static) {
    path.replaceWithMultiple(node.body);
    return;
  }

  throw path.buildCodeFrameError(
    "TODO: Scriptlets are not yet supported by the fluurt runtime."
  );
}
