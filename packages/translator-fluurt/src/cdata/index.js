export default function(path) {
  throw path.hub.buildCodeFrameError(
    "CDATA is not yet supported by the fluurt runtime."
  );
}
