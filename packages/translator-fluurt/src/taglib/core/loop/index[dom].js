import { types as t } from "@marko/babel-types";
import { assertAllowedAttributes } from "@marko/babel-utils";
import getComputedExpression from "../../../util/get-computed-expression";

export default function(path) {
  const { hub, node } = path;
  const {
    body: { body }
  } = node;
  const namePath = path.get("name");

  if (!body || !body.length) {
    throw namePath.buildCodeFrameError(
      "Invalid 'for' tag, missing body content."
    );
  }

  const ofAttr = getAttrValue(path, "of");
  if (ofAttr) {
    const byAttr = getAttrValue(path, "by");
    assertAllowedAttributes(path, ["of", "by"]);

    if (!(node.params && node.params.length)) {
      throw namePath.buildCodeFrameError(
        "Invalid 'for of' tag, missing |value, index| params."
      );
    }

    const callArgs = [
      getComputedExpression(ofAttr) || ofAttr.node,
      t.arrowFunctionExpression(node.params, t.blockStatement(body))
    ];

    if (byAttr) {
      callArgs.push(getComputedExpression(byAttr) || byAttr.node);
    }

    path.replaceWith(
      t.callExpression(hub.importRuntime(path, "loopOf"), callArgs)
    );

    // TODO: technically if we detected that nothing is computed, we could
    // output a regular for loop.

    return;
  }

  const inAttr = getAttrValue(path, "in");
  if (inAttr) {
    assertAllowedAttributes(path, ["in"]);

    if (!(node.params && node.params.length)) {
      throw namePath.buildCodeFrameError(
        "Invalid 'for in' tag, missing |key, value| params."
      );
    }

    const callArgs = [
      getComputedExpression(inAttr) || inAttr.node,
      t.arrowFunctionExpression(node.params, t.blockStatement(body))
    ];

    path.replaceWith(
      t.callExpression(hub.importRuntime(path, "loopIn"), callArgs)
    );

    return;
  }

  const toAttr = getAttrValue(path, "to");
  const fromAttr = getAttrValue(path, "from");
  if (fromAttr && toAttr) {
    assertAllowedAttributes(path, ["from", "to", "step"]);
    const stepAttr = getAttrValue(path, "step");
    const callArgs = [
      getComputedExpression(fromAttr) || fromAttr.node,
      getComputedExpression(toAttr) || toAttr.node,
      stepAttr.node
        ? getComputedExpression(stepAttr) || stepAttr.node
        : t.numericLiteral(1),
      t.arrowFunctionExpression(node.params, t.blockStatement(body))
    ];

    path.replaceWith(
      t.callExpression(hub.importRuntime(path, "loopFrom"), callArgs)
    );

    return;
  }

  throw namePath.buildCodeFrameError(
    "Invalid 'for' tag, missing an 'of', 'in' or 'from/to' attribute."
  );
}

function getAttrValue(path, name) {
  const attr = path
    .get("attributes")
    .find(obj => obj.get("name").node === name);
  return attr && attr.get("value");
}
