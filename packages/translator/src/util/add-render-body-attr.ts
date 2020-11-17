import { types as t, NodePath } from "@marko/babel-types";

export default function addRenderBodyAttr(tag: NodePath<t.MarkoTag>) {
  const { node } = tag;
  const { body } = node.body;

  if (body.length) {
    return tag.pushContainer(
      "attributes",
      t.markoAttribute(
        "renderBody",
        t.arrowFunctionExpression(
          [],
          body.length === 1
            ? ((body[0] as unknown) as t.Expression)
            : t.blockStatement(body)
        )
      )
    )[0];
  }
}
