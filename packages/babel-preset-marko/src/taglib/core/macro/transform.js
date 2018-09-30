export default function(path) {
  const {
    hub: { macros },
    node
  } = path;
  const startTag = path.get("startTag");
  const attributes = startTag.get("attributes");
  const nameAttr = attributes.find(attr => attr.get("name").node === "name");

  if (!nameAttr) {
    throw startTag.buildCodeFrameError(
      'The "name" attribute is required on "macro" tags.'
    );
  }

  if (attributes.length > 1) {
    throw startTag.buildCodeFrameError(
      'The "macro" tag can only have a "name" attribute.'
    );
  }

  const nameAttrValue = nameAttr.get("value");

  if (!nameAttrValue.isStringLiteral()) {
    throw nameAttrValue.buildCodeFrameError(
      'The "name" attribute for "macro" tags must be a string literal.'
    );
  }

  const name = nameAttrValue.node.value;

  if (macros[name]) {
    throw nameAttr.buildCodeFrameError(
      `A macro with the name "${name}" already exists.`
    );
  }

  node._macroId = macros[name] = path.scope.generateUidIdentifier(name);
}
