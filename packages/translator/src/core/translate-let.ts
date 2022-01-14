import { types as t } from "@marko/compiler";
import { assertNoParams } from "@marko/babel-utils";
import { assertNoBodyContent } from "../util/assert";
import translateVar from "../util/translate-var";
import { isOutputDOM } from "../util/marko-config";
import * as writer from "../util/writer";
import { callRuntime } from "../util/runtime";
import replaceAssignments from "../util/replace-assignments";

export default function enter(tag: t.NodePath<t.MarkoTag>) {
  const { node } = tag;
  const tagVar = node.var;
  const [defaultAttr] = node.attributes;

  assertNoParams(tag);
  assertNoBodyContent(tag);

  if (!tagVar) {
    throw tag
      .get("name")
      .buildCodeFrameError("The 'let' tag requires a tag variable.");
  }

  if (!t.isIdentifier(tagVar)) {
    throw tag
      .get("var")
      .buildCodeFrameError("The 'let' cannot be destructured.");
  }

  if (!defaultAttr) {
    throw tag
      .get("name")
      .buildCodeFrameError("The 'let' tag requires a default attribute.");
  }

  if (
    node.attributes.length > 1 ||
    !t.isMarkoAttribute(defaultAttr) ||
    (!defaultAttr.default && defaultAttr.name !== "default")
  ) {
    throw tag
      .get("name")
      .buildCodeFrameError(
        "The 'let' tag only supports the 'default' attribute."
      );
  }

  if (isOutputDOM(tag)) {
    const binding = tagVar.extra.binding!;
    const applyId = writer.bindingToApplyId(tag, binding);
    const scopeId = writer.bindingToScopeId(tag, binding);
    // TODO: add defined guard if bindings exist.
    writer.addStatement(
      "apply",
      tag,
      defaultAttr.extra?.valueReferences,
      t.expressionStatement(t.callExpression(applyId, [defaultAttr.value]))
    );

    replaceAssignments(tag.scope.getBinding(binding.name)!, (v) =>
      callRuntime(tag, "queue", applyId, scopeId, v)
    );
  } else {
    translateVar(tag, defaultAttr.value);
  }

  tag.remove();
}
