import { types as t } from "@marko/babel-types";
import { assertNoAttributes, assertNoArgs } from "@marko/babel-utils";

export default function(path) {
  assertNoAttributes(path);

  switch (path.get("name.value").node) {
    case "if": {
      path.replaceWith(buildIfStatement(path, path.node.arguments));
      break;
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

function buildIfStatement(path, args) {
  if (!args || !args.length) {
    const name = path.get("name");
    throw name.buildCodeFrameError(
      `Invalid '<${name.node.value}>' tag, expected arguments like '<${name.node.value}(test)>'.`
    );
  }

  const ifStatement = t.ifStatement(
    args.length === 1 ? args[0] : t.sequenceExpression(args),
    t.blockStatement(path.node.body.body)
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
