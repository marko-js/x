import * as t from "../../../../definitions";
import { insertBeforeInRenderBody } from "../../util";
import normalizeTemplateLiteral from "../../../../util/normalize-template-string";
const EMPTY_OBJECT = {};

export default function(path, attr, opts = EMPTY_OBJECT) {
  attr.remove();
  const { hub, node } = path;
  const nextKeyMember = t.memberExpression(
    t.identifier("__component"),
    t.identifier("___nextKey")
  );
  const nextKeyCall = t.callExpression(nextKeyMember, [
    node.key || hub.nextKey()
  ]);
  const keyIdentifier = path.scope.generateUidIdentifier("noUpdateKey");
  const name = t.stringLiteral("no-update");
  const replacementAttrs = [t.markoAttribute("cid", keyIdentifier)];

  if (opts.if) {
    replacementAttrs.push(t.markoAttribute("if", opts.if));
  }

  if (opts.bodyOnly) {
    replacementAttrs.push(t.markoAttribute("bodyOnly", t.booleanLiteral(true)));
  }

  const replacement = t.markoTag(name, undefined, undefined, replacementAttrs, [
    node
  ]);
  replacement.key = normalizeTemplateLiteral(["#", ""], [keyIdentifier]);

  insertBeforeInRenderBody(
    path,
    t.variableDeclaration("const", [
      t.variableDeclarator(keyIdentifier, nextKeyCall)
    ])
  );

  path.replaceWith(replacement);
}
