export default function(path) {
  throw path.buildCodeFrameError(
    "Nested @tags are not currently supported in fluurt."
  );
}
