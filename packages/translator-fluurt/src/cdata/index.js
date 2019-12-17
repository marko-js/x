export default function(path) {
  throw path.buildCodeFrameError(
    "CDATA is not supported by the fluurt runtime."
  );
}
