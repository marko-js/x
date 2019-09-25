import { types as t } from "@marko/babel-types";
import { assertAllowedAttributes } from "@marko/babel-utils";

export function exit(path) {
  const { node } = path;
  const {
    attributes,
    body: { body }
  } = node;
  const namePath = path.get("name");
  const byAttr = findName(attributes, "by");

  const ofAttr = findName(attributes, "of");
  if (ofAttr) {
    assertAllowedAttributes(path, ["of", "by"]);

    if (!(node.params && node.params.length)) {
      throw namePath.buildCodeFrameError(
        "Invalid 'for of' tag, missing |value, index| params."
      );
    }

    forNode = [];

    path.replaceWith(
      t.callExpression(hub.importNamed(path, "fluurt", "loop"), [
        ofAttr.value,
        t.arrowFunctionExpression(node.params, body),
        byAttr
      ])
    );

    return;
  }

  const inAttr = findName(attributes, "in");
  if (inAttr) {
    assertAllowedAttributes(path, ["in", "by"]);
    throw inAttr.buildCodeFrameError(
      "TODO: The 'in' attribute is not currently supported on the for loop in fluurt."
    );
  }

  const fromAttr = findName(attributes, "from");
  const toAttr = findName(attributes, "to");
  if (fromAttr || toAttr) {
    assertAllowedAttributes(path, ["from", "to", "step", "by"]);
    throw inAttr.buildCodeFrameError(
      "TODO: The 'from' and 'to' attributes are not currently supported on the for loop in fluurt."
    );
  }

  throw namePath.buildCodeFrameError(
    "Invalid 'for' tag, missing an 'of', 'in' or 'to' attribute."
  );
}

function findName(arr, value) {
  return arr.find(obj => obj.name === value);
}
