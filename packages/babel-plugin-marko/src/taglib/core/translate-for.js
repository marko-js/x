import * as t from "../../definitions";
import {
  toStatement,
  assertAllowedAttributes,
  replaceInRenderBody
} from "./util";

export default function(path) {
  const { node } = path;
  const { attributes, body } = node;
  const namePath = path.get("name");
  const ofAttr = findName(attributes, "of");
  const inAttr = findName(attributes, "in");
  const fromAttr = findName(attributes, "from");
  const toAttr = findName(attributes, "to");
  const block = t.blockStatement(body.map(toStatement));
  let forNode;
  let allowedAttributes = ["by"];

  if (inAttr) {
    allowedAttributes.push("in");

    const [keyParam, valParam] = node.params || [];

    if (!keyParam) {
      throw namePath.buildCodeFrameError(
        "Invalid 'for in' tag, missing |key, value| params."
      );
    }

    if (valParam) {
      block.body.unshift(
        t.variableDeclaration("const", [
          t.variableDeclarator(
            valParam,
            t.memberExpression(inAttr.value, keyParam, true)
          )
        ])
      );
    }

    forNode = t.forInStatement(
      t.variableDeclaration("const", [t.variableDeclarator(keyParam)]),
      inAttr.value,
      block
    );
  } else if (ofAttr) {
    allowedAttributes.push("of");

    const [valParam, keyParam] = node.params || [];

    if (!valParam) {
      throw namePath.buildCodeFrameError(
        "Invalid 'for of' tag, missing |value, index| params."
      );
    }

    forNode = [];

    if (keyParam) {
      const indexName = path.scope.generateUidIdentifier(keyParam.name);
      forNode.push(
        t.variableDeclaration("let", [
          t.variableDeclarator(indexName, t.numericLiteral(-1))
        ])
      );

      block.body.unshift(
        t.variableDeclaration("let", [
          t.variableDeclarator(keyParam, t.updateExpression("++", indexName))
        ])
      );
    }

    forNode.push(
      t.forOfStatement(
        t.variableDeclaration("const", [t.variableDeclarator(valParam)]),
        ofAttr.value,
        block
      )
    );
  } else if (fromAttr && toAttr) {
    allowedAttributes.push("from", "to", "step");

    const stepAttr = findName(attributes, "step");
    const [keyParam] = node.params;
    const indexName = path.scope.generateUidIdentifier(
      keyParam ? keyParam.name : "i"
    );

    if (keyParam) {
      block.body.unshift(
        t.variableDeclaration("const", [
          t.variableDeclarator(keyParam, indexName)
        ])
      );
    }

    forNode = t.forStatement(
      t.variableDeclaration("let", [
        t.variableDeclarator(indexName, fromAttr.value)
      ]),
      t.binaryExpression("<=", indexName, toAttr.value),
      stepAttr
        ? t.assignmentExpression("+=", indexName, stepAttr.value)
        : t.updateExpression("++", indexName),
      block
    );
  } else {
    throw namePath.buildCodeFrameError(
      "Invalid 'for' tag, missing an 'of', 'in' or 'to' attribute."
    );
  }

  assertAllowedAttributes(path, allowedAttributes);
  replaceInRenderBody(path, forNode);
}

function findName(arr, value) {
  return arr.find(obj => obj.name === value);
}
