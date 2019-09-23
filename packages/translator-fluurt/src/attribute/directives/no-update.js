const EMPTY_OBJECT = {};

export default function(tag, attr, opts = EMPTY_OBJECT) {
  throw attr.buildCodeFrameError(
    `The ${attr.name.value} directive is not yet supported in fluurt.`
  );
}
