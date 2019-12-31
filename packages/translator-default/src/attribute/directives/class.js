import { types as t } from "@marko/babel-types";
import { isHTMLTag } from "@marko/babel-utils";
import classToString from "marko/src/runtime/helpers/class-value";

export default function(tag, _, value) {
  const { hub } = tag;
  if (!isHTMLTag(tag)) return;
  if (value.isStringLiteral()) return;

  const { confident, value: computed } = value.evaluate();

  value.replaceWith(
    confident
      ? t.stringLiteral(classToString(computed) || "")
      : t.callExpression(
          hub.importDefault(
            tag,
            "marko/src/runtime/helpers/class-value",
            "marko_class_merge"
          ),
          [value.node]
        )
  );
}
