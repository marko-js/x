import * as t from "./definitions";

export const visitor = {
  HTMLElement: {
    exit(path) {
      // let start = write`<${path.node.startTag.name}${
      //   path.node.startTag.attributes.map(attr => {
      //     return `${attr.name}=`
      //   })
      // }>`;
      // let end = write`</${path.node.endTag.name}>`;
      // path.replaceWithMultiple([
      //   withPreviousLocation(start, path.node.startTag),
      //   ...path.node.children,
      //   withPreviousLocation(end, path.node.endTag),
      // ]);
    }
  },
  HTMLText(path) {
    path.replaceWith(
      withPreviousLocation(
        write`${t.stringLiteral(path.node.value)}`,
        path.node
      )
    );
  },
  HTMLPlaceholder(path) {
    path.replaceWith(write`${path.node.value}`);
  }
};

function write(strings, ...expressions) {
  let quasis = [].concat(strings.raw);
  let argument;
  normalizeQuasiExpressions(quasis, expressions);
  if (
    expressions.length === 1 &&
    quasis.length === 2 &&
    quasis.every(s => s === "")
  ) {
    argument = expressions[0];
  } else {
    argument = t.templateLiteral(
      quasis.map(s => t.templateElement({ raw: s, cooked: s })),
      expressions
    );
  }
  return t.callExpression(
    t.memberExpression(t.identifier("out"), t.identifier("w")),
    [argument]
  );
}

function normalizeQuasiExpressions(quasis, expressions) {
  for (let i = 0; i < expressions.length; i++) {
    let value = expressions[i];
    if (typeof value === "string") {
      expressions.splice(i, 1);
      quasis.splice(i, 2, quasis[i] + value + quasis[i + 1]);
      i--;
    }
  }
}

function withPreviousLocation(newNode, originalNode) {
  const { start, end, loc } = originalNode;
  return Object.assign(newNode, { start, end, loc });
}
