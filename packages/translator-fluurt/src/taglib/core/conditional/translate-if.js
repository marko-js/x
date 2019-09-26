import { types as t } from "@marko/babel-types";
import { assertNoAttributes, getArgOrSequence } from "@marko/babel-utils";
import getComputedExpression from "../../../util/get-computed-expression";

export function exit(path) {
  assertNoAttributes(path);
  const insertions = [];
  const conditionId = path.scope.generateUid("if");
  const [replacement] = path.replaceWith(
    t.expressionStatement(
      t.callExpression(path.hub.importNamed(path, "fluurt", "conditional"), [
        buildCondition(path)
      ])
    )
  );

  const conditionPath = replacement.get("expression.arguments")[0];
  const computedCondition = getComputedExpression(conditionPath);
  if (computedCondition) {
    // TODO: technically if we detected that this isn't computed, we could
    // output a regular if statement.
    conditionPath.replaceWith(computedCondition);
  }

  replacement.insertBefore(insertions);

  function buildCondition(branch) {
    const arg = getArgOrSequence(branch);

    if (!arg) {
      const tagName = branch.node.name.value;
      throw branch
        .get("name")
        .buildCodeFrameError(
          `Invalid '<${tagName}>' tag, expected arguments like '<${tagName}(test)>'.`
        );
    }

    const condition = t.conditionalExpression(
      arg,
      addBranchBody(branch),
      t.nullLiteral()
    );
    const next = branch.getNextSibling();

    if (next.isMarkoTag()) {
      const nextTagName = next.get("name.value").node;

      if (nextTagName === "else-if") {
        condition.alternate = buildCondition(next);
        next.remove();
      } else if (nextTagName === "else") {
        condition.alternate = addBranchBody(next);
        next.remove();
      }
    }

    if (t.isNullLiteral(condition.alternate)) {
      return t.logicalExpression("&&", condition.test, condition.consequent);
    }

    return condition;
  }

  function addBranchBody(branch) {
    const id = path.scope.generateUidIdentifier(`${conditionId}Branch`);
    insertions.push(
      t.variableDeclaration("const", [
        t.variableDeclarator(
          id,
          t.arrowFunctionExpression([], t.blockStatement(branch.node.body.body))
        )
      ])
    );

    return id;
  }
}
