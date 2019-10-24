import { types as t } from "@marko/babel-types";
import { assertNoArgs, assertNoAttributes } from "@marko/babel-utils";

export function enter(path) {
  const { hub } = path;
  const params = path.get("params");
  assertNoArgs(path);
  assertNoAttributes(path);

  if (!params.length) {
    throw path.buildCodeFrameError(
      "The state tag should have parameters to provide the state, eg '<state|x = 1|>."
    );
  }

  const [stateValue, stateSet] = params;
  let id, value;

  if (stateValue.isAssignmentPattern()) {
    id = stateValue.node.left;
    value = stateValue.node.right;
  } else if (stateValue.isObjectPattern()) {
    throw stateValue.buildCodeFrameError(
      "Destructuring the value of the <state> tag is not currently supported, eg '<!state|{ x }|>'."
    );
  } else {
    id = stateValue.node;
  }

  path.insertBefore(path.node.body.body);

  if (hub.options.output === "html") {
    path
      .replaceWith(
        t.variableDeclaration("const", [
          t.variableDeclarator(id, value || t.identifier("undefined"))
        ])
      )[0]
      .scope.crawl();
  } else {
    const stateSetBinding = path
      .get("body")
      .scope.getBinding(stateSet.node.name);
    for (const stateSetCall of stateSetBinding.referencePaths) {
      if (stateSetCall.parentPath.isCallExpression()) {
        stateSetCall.parentPath.unshiftContainer(
          "arguments",
          t.identifier(id.name)
        );
        stateSetCall.parentPath.set(
          "callee",
          hub.importRuntime(stateSetCall, "set")
        );
      } else {
        throw stateSetCall.buildCodeFrameError(
          "A state setter can only be used as a direct function call."
        );
      }
    }

    path
      .replaceWith(
        t.variableDeclaration("const", [
          t.variableDeclarator(
            id,
            t.newExpression(
              hub.importRuntime(path, "Signal"),
              value ? [value] : []
            )
          )
        ])
      )[0]
      .scope.crawl();
  }
}
