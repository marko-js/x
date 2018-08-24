import * as t from "../../../definitions";
import { toStatement, strictAttributes, replaceInRenderBody } from "./_util";

export default translate;

function translate(path) {
  const { node } = path;
  const { startTag, children } = node;
  const { attributes } = startTag;
  const ofAttr = findName(attributes, "of");
  const inAttr = findName(attributes, "in");
  const fromAttr = findName(attributes, "from");
  const toAttr = findName(attributes, "to");
  const block = t.blockStatement(children.map(toStatement));
  let forNode;
  let allowedAttributes = ["by"];

  if (!startTag.params.length) {
    throw path.buildCodeFrameError(
      "Invalid 'for' tag, missing leading params."
    );
  }

  if (inAttr) {
    allowedAttributes.push("in");

    const [keyParam, valParam] = startTag.params;

    if (valParam) {
      block.body.unshift(
        t.variableDeclaration("let", [
          t.variableDeclarator(
            valParam,
            t.memberExpression(inAttr.value, keyParam, true)
          )
        ])
      );
    }

    forNode = t.forInStatement(
      t.variableDeclaration("let", [t.variableDeclarator(keyParam)]),
      inAttr.value,
      block
    );
  } else if (ofAttr) {
    allowedAttributes.push("of");

    const [
      valParam,
      keyParam = path.scope.generateUidIdentifier("key")
    ] = startTag.params;

    block.body.unshift(
      t.variableDeclaration("let", [
        t.variableDeclarator(
          valParam,
          t.memberExpression(ofAttr.value, keyParam, true)
        )
      ])
    );

    forNode = t.forStatement(
      t.variableDeclaration("let", [
        t.variableDeclarator(keyParam, t.numericLiteral(0))
      ]),
      t.binaryExpression(
        "<",
        keyParam,
        t.memberExpression(ofAttr.value, t.identifier("length"))
      ),
      t.updateExpression("++", keyParam),
      block
    );
  } else if (fromAttr && toAttr) {
    allowedAttributes.push("from", "to", "step");

    const stepAttr = findName(attributes, "step");
    const [keyParam] = startTag.params;

    forNode = t.forStatement(
      t.variableDeclaration("let", [
        t.variableDeclarator(keyParam, fromAttr.value)
      ]),
      t.binaryExpression("<=", keyParam, toAttr.value),
      stepAttr
        ? t.assignmentExpression("+=", keyParam, stepAttr.value)
        : t.updateExpression("++", keyParam),
      block
    );
  } else {
    throw path.buildCodeFrameError(
      "Invalid 'for' tag, missing an 'of', 'in' or 'to' attribute."
    );
  }

  strictAttributes(path, allowedAttributes);
  replaceInRenderBody(path, forNode);
}

function findName(arr, value) {
  return arr.find(obj => obj.name === value);
}
