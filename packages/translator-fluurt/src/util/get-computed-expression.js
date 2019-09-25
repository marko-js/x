import { types as t } from "@marko/babel-types";

export default path => {
  const { hub } = path;

  if (
    path.isNullLiteral() ||
    path.isStringLiteral() ||
    path.isBooleanLiteral() ||
    path.isNumericLiteral() ||
    path.isBigIntLiteral() ||
    path.isRegExpLiteral() ||
    path.isIdentifier() ||
    (path.isMemberExpression() &&
      isRendererParamBinding(getBindingInRenderer(path)))
  ) {
    return false;
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

      if (
        parentPath.isMemberExpression() &&
        identifier.key === "property" &&
        getBindingInRenderer(parentPath)
      ) {
        pathsToWrap.push(parentPath);
        return;
      }

      const binding = getBindingInRenderer(identifier);

      if (binding && !isRendererParamBinding(binding)) {
        pathsToWrap.push(identifier);
      }
    }
  });

  if (pathsToWrap.length !== 0) {
    pathsToWrap.forEach(wrapWithGetCall);
    return t.callExpression(hub.importNamed(path, "fluurt", "compute"), [
      t.arrowFunctionExpression([], path.node)
    ]);
  }

  return false;
};

function wrapWithGetCall(expression) {
  expression.container[expression.key] = t.callExpression(
    expression.hub.importNamed(expression, "fluurt", "get"),
    [expression.node]
  );
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
