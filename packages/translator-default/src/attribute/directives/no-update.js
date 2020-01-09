import { types as t } from "@marko/babel-types";
import { isNativeTag } from "@marko/babel-utils";
const EMPTY_OBJECT = {};

export default function(tag, attr, opts = EMPTY_OBJECT) {
  attr.remove();
  const { hub, node } = tag;

  const keyValue = node.key || getKeyManager(tag).nextKey();
  const keyIdentifier = tag.scope.generateUidIdentifier("noUpdateKey");
  const replacement = t.markoTag(
    t.stringLiteral("_no-update"),
    [],
    opts.bodyOnly ? node.body : t.markoTagBody([node])
  );
  replacement.key = keyIdentifier;
  node.key = keyIdentifier;

  tag.insertBefore(
    t.variableDeclaration("const", [
      t.variableDeclarator(
        keyIdentifier,
        t.callExpression(
          t.memberExpression(hub._componentDefIdentifier, t.identifier("nk")),
          [keyValue]
        )
      )
    ])
  );

  if (opts.if) {
    replacement.attributes.push(t.markoAttribute("if", opts.if));
  }

  if (isNativeTag(tag)) {
    if (opts.bodyOnly) {
      replacement.attributes.push(
        t.markoAttribute("body-only", t.booleanLiteral(true))
      );

      tag.set("body", t.markoTagBody([replacement]));
      return;
    }
  } else {
    replacement.attributes.push(
      t.markoAttribute("component", t.booleanLiteral(true))
    );
  }

  tag.replaceWith(replacement)[0].visit();
}
