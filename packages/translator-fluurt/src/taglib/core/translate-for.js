import { types as t } from "@marko/babel-types";
import { assertAllowedAttributes } from "@marko/babel-utils";
import getComputedExpression from "../../util/get-computed-expression";

export function exit(path) {
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
      t.callExpression(hub.importNamed(path, "fluurt", "loop"), callArgs)
    );

    return;
  }

  const inAttr = getAttrValue(path, "in");
  if (inAttr) {
    assertAllowedAttributes(path, ["in"]);
    throw inAttr.buildCodeFrameError(
      "TODO: The 'in' attribute is not currently supported on the for loop in fluurt."
    );
  }

  const fromAttr = getAttrValue(path, "from");
  const toAttr = getAttrValue(path, "to");
  if (fromAttr || toAttr) {
    assertAllowedAttributes(path, ["from", "to", "step"]);
    throw inAttr.buildCodeFrameError(
      "TODO: The 'from' and 'to' attributes are not currently supported on the for loop in fluurt."
    );
  }

  throw namePath.buildCodeFrameError(
    "Invalid 'for' tag, missing an 'of', 'in' or 'to' attribute."
  );
}

function getAttrValue(path, name) {
  const attr = path
    .get("attributes")
    .find(obj => obj.get("name").node === name);
  return attr && attr.get("value");
}
