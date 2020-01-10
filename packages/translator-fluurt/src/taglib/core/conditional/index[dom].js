import { types as t } from "@marko/babel-types";
import {
  assertNoAttributes,
  assertNoArgs,
  getArgOrSequence
} from "@marko/babel-utils";
import getComputedExpression from "../../../util/get-computed-expression";

export default function(path) {
  assertNoAttributes(path);

  switch (path.get("name.value").node) {
    case "if": {
      const insertions = [];
      const conditionId = path.scope.generateUid("if");
      const [replacement] = path.replaceWith(
        t.expressionStatement(
          t.callExpression(path.hub.importRuntime(path, "conditional"), [
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
      break;

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
          return t.logicalExpression(
            "&&",
            condition.test,
            condition.consequent
          );
        }

        return condition;
      }

      function addBranchBody(branch) {
        const id = path.scope.generateUidIdentifier(`${conditionId}Branch`);
        insertions.push(
          t.variableDeclaration("const", [
            t.variableDeclarator(
              id,
              t.arrowFunctionExpression(
                [],
                t.blockStatement(branch.node.body.body)
              )
            )
          ])
        );

        return id;
      }
    }
    case "else-if": {
      const { ifStatement, arguments: args } = path.node;

      if (!ifStatement) {
        throw path
          .get("name")
          .buildCodeFrameError(
            "Invalid 'else-if' tag, expected preceding 'if' or 'else-if' tag."
          );
      }

      ifStatement.alternate = buildIfStatement(path, args);
      path.remove();
      break;
    }
    case "else": {
      const {
        ifStatement,
        body: { body }
      } = path.node;

      assertNoArgs(path);

      if (!ifStatement) {
        throw path
          .get("name")
          .buildCodeFrameError(
            "Invalid 'else' tag, expected preceding 'if' or 'else-if' tag."
          );
      }

      ifStatement.alternate = t.blockStatement(body);
      path.remove();
      break;
    }
  }
}

function buildIfStatement(path) {
  if (!path.get("arguments").length) {
    const name = path.get("name");
    throw name.buildCodeFrameError(
      `Invalid '<${name.node.value}>' tag, expected arguments like '<${name.node.value}(test)>'.`
    );
  }

  const ifStatement = t.conditionalExpression(
    argsToComputed(path),
    t.arrowFunctionExpression([], path.node.body.body)
  );

  let nextPath = path.getNextSibling();

  // Provide the if statement to the next part of the if chain.
  if (nextPath.isMarkoTag()) {
    const nextTagName = nextPath.get("name");
    if (
      nextTagName.isStringLiteral({ value: "else" }) ||
      nextTagName.isStringLiteral({ value: "else-if" })
    ) {
      nextPath.node.ifStatement = ifStatement;
    }
  }

  return ifStatement;
}

function argsToComputed(path) {
  const args = path.get("arguments");
  let arg = args[0];
  const normalized = getArgOrSequence(path);

  if (t.isSequenceExpression(normalized)) {
    [arg] = args[0].replaceWith(normalized);
    for (let i = 1; i < args.length; i++) {
      args[i].remove();
    }
  }

  return getComputedExpression(arg) || arg.node;
}
