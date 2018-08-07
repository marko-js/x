import * as t from "../../../../definitions";

export function parseIfStatement(path) {
  const {
    node,
    hub: {
      file: {
        ast: { parseExpression }
      }
    }
  } = path;
  const { startTag, children } = node;
  const { rawValue } = startTag;
  const expressionString = rawValue.replace(/^(?:else-)?if\s*/, "");
  const startPos = startTag.start + (rawValue.length - expressionString.length);
  const expression = parseExpression(expressionString, startPos);

  // todo validate attributes.
  return t.ifStatement(expression, t.blockStatement(children.map(toStatement)));
}

export function toStatement(node) {
  if (t.isExpression(node)) {
    return t.expressionStatement(node);
  }

  return node;
}

export function getPreviousIfStatement(path) {
  const prev = path.getPrevSibling();

  if (prev) {
    if (isWrittenWhitespace(prev.node)) {
      prev.remove();
      return getPreviousIfStatement(path);
    }

    if (t.isIfStatement(prev.node)) {
      return getDeepestAlternate(prev.node);
    }
  }
}

function getDeepestAlternate(node) {
  while (node.alternate) {
    node = node.alternate;
  }

  return node;
}

function isWrittenWhitespace(node) {
  return (
    t.isCallExpression(node) &&
    t.isMemberExpression(node.callee) &&
    node.callee.object.name === "out" &&
    node.callee.property.name === "w" &&
    node.arguments.length === 1 &&
    t.isStringLiteral(node.arguments[0]) &&
    /^\s*$/.test(node.arguments[0].value)
  );
}
