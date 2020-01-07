import { types as t } from "@marko/babel-types";
import { normalizeTemplateString } from "@marko/babel-utils";
import { getKeyManager } from "../../util/key-manager";
const EMPTY_OBJECT = {};

export default function(tag, attr, opts = EMPTY_OBJECT) {
  attr.remove();
  const { hub, node } = tag;
  const nextKeyMember = t.memberExpression(
    hub._componentDefIdentifier,
    t.identifier("___nextKey")
  );
  const nextKeyCall = t.callExpression(nextKeyMember, [
    node.key || getKeyManager(tag).nextKey()
  ]);
  const keyIdentifier = tag.scope.generateUidIdentifier("noUpdateKey");
  const replacementAttrs = [t.markoAttribute("cid", keyIdentifier)];

  if (opts.if) {
    replacementAttrs.push(t.markoAttribute("if", opts.if));
  }

  if (opts.bodyOnly) {
    replacementAttrs.push(
      t.markoAttribute("body-only", t.booleanLiteral(true))
    );
  }

  const replacement = t.markoTag(
    t.stringLiteral("_no-update"),
    replacementAttrs,
    t.markoTagBody([node])
  );
  replacement.key = normalizeTemplateString`#${keyIdentifier}`;

  tag.insertBefore(
    t.variableDeclaration("const", [
      t.variableDeclarator(keyIdentifier, nextKeyCall)
    ])
  );

  tag.replaceWith(replacement)[0].visit();
}
