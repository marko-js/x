import { types as t } from "@marko/babel-types";
import { isHTMLTag } from "@marko/babel-utils";
import { cl as classToString } from "marko/src/runtime/html/helpers";

export default function(tag, _, value) {
  const { hub } = tag;
  if (!isHTMLTag(tag)) return;
  if (value.isStringLiteral()) return;

  const { confident, value: computed } = value.evaluate();

  value.replaceWith(
    confident
      ? t.stringLiteral(classToString(computed) || "")
      : t.callExpression(
          hub.importNamed(
            tag,
            "marko/src/runtime/html/helpers", // TODO: expose CL in vdom.
            "cl",
            "marko_class_merge"
          ),
          [value.node]
        )
  );
}
