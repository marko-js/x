import { types as t } from "@marko/babel-types";

export default path => {
  const { hub } = path;

  if (
    path.isLiteral() ||
    path.isIdentifier() ||
    (path.isMemberExpression() &&
      isRendererParamBinding(getBindingInRenderer(path)))
  ) {
    return false;
  }

  debugger;

  const pathsToWrap = [];

  // TODO: look into path.willMaybeExecuteBefore for reducing `get` calls
  path.traverse({
    Identifier(identifier) {
      if (
        identifier.parentPath.isMemberExpression() &&
        identifier.key === "property" &&
        getBindingInRenderer(identifier.parentPath)
      ) {
        pathsToWrap.push(identifier.parentPath);
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
    path.replaceWith(
      t.callExpression(hub.importNamed(path, "fluurt", "compute"), [
        t.arrowFunctionExpression([], path.node)
      ])
    );

    return true;
  }

  return false;
};

function wrapWithGetCall(expression) {
  const [replacement] = expression.replaceWith(
    t.callExpression(expression.hub.importNamed(expression, "fluurt", "get"), [
      expression.node
    ])
  );

  replacement.skip();
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
