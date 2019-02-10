import { getArgOrSequence } from "../../../../taglib/core/util";

export default function(tag, attr) {
  const condition = getArgOrSequence(attr);

  if (!condition) {
    throw attr.buildCodeFrameError(
      'The "body-only-if(condition)" attribute requires a condition argument.'
    );
  }

  tag.node.bodyOnlyIf = condition;
  attr.remove();
}
