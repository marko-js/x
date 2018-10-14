import * as t from "../../../../definitions";
import { insertBeforeInRenderBody } from "../../util";
import normalizeTemplateLiteral from "../../../../util/normalize-template-string";

export default function(path, attr) {
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
  const replacement = t.htmlElement(
    t.htmlStartTag(name, [], [t.htmlAttribute("cid", keyIdentifier)]),
    t.htmlEndTag(name),
    [node],
    []
  );

  replacement.key = normalizeTemplateLiteral(["#", ""], [keyIdentifier]);

  insertBeforeInRenderBody(
    path,
    t.variableDeclaration("const", [
      t.variableDeclarator(keyIdentifier, nextKeyCall)
    ])
  );

  path.replaceWith(replacement);
}
