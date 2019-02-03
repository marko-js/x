import { getArgOrSequence } from "../../util";

export default function(path, attr) {
  const condition = getArgOrSequence(attr);

  if (!condition) {
    throw attr.buildCodeFrameError(
      'The "body-only-if(condition)" attribute requires a condition argument.'
    );
  }

  path.node.bodyOnlyIf = condition;
  attr.remove();
}
