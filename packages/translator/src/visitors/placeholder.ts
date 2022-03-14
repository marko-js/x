import { types as t } from "@marko/compiler";
import { isNativeTag } from "@marko/babel-utils";
import { isOutputHTML } from "../util/marko-config";
import { callRuntime, getHTMLRuntime } from "../util/runtime";
import evaluate from "../util/evaluate";
import { getSectionId, getOrCreateSectionId } from "../util/sections";
import { ReserveType, reserveScope } from "../util/reserve";
import { addStatement } from "../util/apply-hydrate";
import * as writer from "../util/writer";
import * as walks from "../util/walks";
import { scopeIdentifier } from "./program";

const ESCAPE_TYPES = {
  script: "escapeScript",
  style: "escapeStyle",
} as Record<string, string>;

type HTMLMethod = "escapeScript" | "escapeStyle" | "escapeXML" | "toString";
type DOMMethod = "html" | "data";

export default {
  analyze(placeholder: t.NodePath<t.MarkoPlaceholder>) {
    const { node } = placeholder;
    const { confident, computed } = evaluate(placeholder);

    if (!(confident && (node.escape || !computed))) {
      reserveScope(
        ReserveType.Visit,
        getOrCreateSectionId(placeholder),
        node,
        "placeholder"
      );
    }
  },
  translate(placeholder: t.NodePath<t.MarkoPlaceholder>) {
    const isHTML = isOutputHTML();
    const write = writer.writeTo(placeholder);
    const extra = placeholder.node.extra;
    const { confident, computed, valueReferences, reserve } = extra;
    const canWriteHTML =
      isHTML || (confident && (placeholder.node.escape || !computed));
    const method = canWriteHTML
      ? placeholder.node.escape
        ? ESCAPE_TYPES[getParentTagName(placeholder)] || "escapeXML"
        : "toString"
      : placeholder.node.escape
      ? "data"
      : "html";

    if (confident && canWriteHTML) {
      write`${getHTMLRuntime()[method as HTMLMethod](computed)}`;
    } else {
      walks.visit(placeholder, walks.WalkCodes.Replace);

      if (isHTML) {
        write`${callRuntime(
          method as HTMLMethod | DOMMethod,
          placeholder.node.value
        )}`;
      } else {
        addStatement(
          "apply",
          getSectionId(placeholder),
          valueReferences,
          t.expressionStatement(
            callRuntime(
              method as DOMMethod,
              scopeIdentifier,
              t.numericLiteral(reserve!.id!),
              placeholder.node.value
            )
          )
        );
      }
    }

    walks.enterShallow(placeholder);
    placeholder.remove();
  },
};

function getParentTagName({ parentPath }: t.NodePath<t.MarkoPlaceholder>) {
  return (
    (parentPath.isMarkoTag() &&
      isNativeTag(parentPath) &&
      (parentPath.node.name as t.StringLiteral).value) ||
    ""
  );
}
