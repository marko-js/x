import { types as t } from "@marko/babel-types";

export default path => {
  const { hub } = path;
  if (
    hub.options.output === "html" ||
    path.isNullLiteral() ||
    path.isStringLiteral() ||
    path.isBooleanLiteral() ||
    path.isNumericLiteral() ||
    path.isBigIntLiteral() ||
    path.isRegExpLiteral()
  ) {
    return false;
  }

  if (
    path.isIdentifier() ||
    (path.isMemberExpression() &&
      isRendererParamBinding(getBindingInRenderer(path)))
  ) {
    return path.node;
  }

  const pathsToWrap = [];

  // TODO: look into path.willMaybeExecuteBefore for reducing `get` calls
  path.traverse({
    Identifier(identifier) {
      const { parentPath } = identifier;

      if (
        identifier.listKey === "params" ||
        (parentPath.isObjectProperty() && !parentPath.get("computed").node)
      ) {
        return;
      }

      if (parentPath.isMemberExpression()) {
        if (identifier.key === "property" && getBindingInRenderer(parentPath)) {
          pathsToWrap.push(parentPath);
        }

        return;
      }

      const binding = getBindingInRenderer(identifier);

      if (!binding || isRendererParamBinding(binding)) {
        return;
      }

      pathsToWrap.push(identifier);
    }
  });

  if (pathsToWrap.length === 0) {
    return false;
  }

  pathsToWrap.forEach(wrapWithGetCall);

  if (path.isFunction()) {
    return false;
  }

  return t.callExpression(hub.importRuntime(path, "compute"), [
    t.arrowFunctionExpression([], path.node)
  ]);
};

function wrapWithGetCall(expression) {
  expression.container[
    expression.key
  ] = t.callExpression(expression.hub.importRuntime(expression, "get"), [
    expression.node
  ]);
}

function getFirstIdentifierInMemberExpression(memberExpression) {
  let cur = memberExpression;
  do {
    cur = cur.get("object");
  } while (cur.isMemberExpression());

  return cur;
}

function getBindingInRenderer(expression) {
  const identifier = expression.isMemberExpression()
    ? getFirstIdentifierInMemberExpression(expression)
    : expression;
  const binding = identifier.scope.getBinding(identifier.get("name").node);
  return (
    binding &&
    binding.path.findParent(it => it.isExportDefaultDeclaration()) &&
    binding
  );
}

function isRendererParamBinding(binding) {
  return (
    binding &&
    binding.kind === "param" &&
    t.isExportDefaultDeclaration(binding.scope.parentBlock)
  );
}
