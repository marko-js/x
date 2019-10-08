import { normalizeTemplateString } from "@marko/babel-utils";

export const visitor = {
  Program(path) {
    const { scope } = path;
    scope.crawl();

    let writeIdentifier;

    for (const childPath of path.get("body")) {
      if (childPath.isImportDeclaration()) {
        if (childPath.get("source.value").node === "fluurt/html") {
          for (const specifier of childPath.get("specifiers")) {
            if (specifier.get("imported.name").node === "write") {
              writeIdentifier = specifier.get("local");
            }
          }
        }
      }

      if (writeIdentifier) {
        break;
      }
    }

    if (writeIdentifier) {
      const binding = scope.getBinding(writeIdentifier.get("name").node);
      for (const ref of binding.referencePaths) {
        if (
          ref.parentPath.isCallExpression() &&
          ref.parentPath.parentPath.isExpressionStatement()
        ) {
          mergeAdjacentWriteCalls(ref.parentPath.parentPath);
        }
      }
    }
  }
};

function mergeAdjacentWriteCalls(path) {
  let curPath = path;
  const writeName = path.get("expression.callee.name").node;
  const quasis = [""];
  const expressions = [];
  const removals = [];

  do {
    const content = getOutContent(curPath, writeName);
    if (!content) break;
    if (curPath !== path) removals.push(curPath);
    quasis.push("");
    expressions.push(content);
  } while ((curPath = curPath.getNextSibling()));

  removals.forEach(removal => removal.remove());

  if (expressions.length > 1) {
    path
      .get("expression.arguments.0")
      .replaceWith(normalizeTemplateString(quasis, ...expressions));
  }
}

function getOutContent(path, writeName) {
  if (path.isExpressionStatement()) {
    return getOutContent(path.get("expression"), writeName);
  }

  return (
    path.isCallExpression() &&
    path.get("callee").isIdentifier() &&
    path.get("callee.name").node === writeName &&
    path.get("arguments.0").node
  );
}
