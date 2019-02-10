import * as t from "../../../../definitions";
import normalizeTemplateLiteral from "../../../../util/normalize-template-string";
const EMPTY_OBJECT = {};

export default function(tag, attr, opts = EMPTY_OBJECT) {
  attr.remove();
  const { hub, node } = tag;
  const nextKeyMember = t.memberExpression(
    hub._componentDefIdentifier,
    t.identifier("___nextKey")
  );
  const nextKeyCall = t.callExpression(nextKeyMember, [
    node.key || hub.nextKey()
  ]);
  const keyIdentifier = tag.scope.generateUidIdentifier("noUpdateKey");
  const name = t.stringLiteral("no-update");
  const replacementAttrs = [t.markoAttribute("cid", keyIdentifier)];

  if (opts.if) {
    replacementAttrs.push(t.markoAttribute("if", opts.if));
  }

  if (opts.bodyOnly) {
    replacementAttrs.push(t.markoAttribute("bodyOnly", t.booleanLiteral(true)));
  }

  const replacement = t.markoTag(name, replacementAttrs, [node]);
  replacement.key = normalizeTemplateLiteral(["#", ""], [keyIdentifier]);

  tag.insertBefore(
    t.variableDeclaration("const", [
      t.variableDeclarator(keyIdentifier, nextKeyCall)
    ])
  );

  tag.replaceWith(replacement);
}
