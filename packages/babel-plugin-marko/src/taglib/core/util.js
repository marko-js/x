import * as t from "../../definitions";

export function toStatement(node) {
  if (t.isExpression(node)) {
    return t.expressionStatement(node);
  }

  return node;
}

export function isHTMLTag(path) {
  const tagName = path.get("name");
  return tagName.isStringLiteral() && tagName.node.value[0] !== "@";
}

export function assertIsRoot(path) {
  if (!t.isProgram(path.parent)) {
    throw path
      .get("name")
      .buildCodeFrameError(
        `"${
          path.node.name.value
        }" tags must be at the root of your Marko template.`
      );
  }
}

export function assertAllowedAttributes(path, allowed) {
  const { node } = path;
  node.attributes.forEach((attr, i) => {
    if (!allowed.includes(attr.name)) {
      throw path
        .get(`attributes.${i}`)
        .buildCodeFrameError(
          `Invalid "${node.name.value}" tag attribute: "${attr.name}".`
        );
    }
  });
}

export function assertNoParams(path) {
  const { hub } = path;
  const params = path.get("params");
  if (params.length) {
    const start = params[0].node.start;
    const end = params[params.length - 1].node.end;
    throw hub.buildError({ start, end }, "Tag does not support parameters.");
  }
}

export function assertNoArgs(path) {
  const { hub } = path;
  const args = path.get("arguments");
  if (args.length) {
    const start = args[0].node.start;
    const end = args[args.length - 1].node.end;
    throw hub.buildError({ start, end }, "Tag does not support arguments.");
  }
}

export function getArgOrSequence(path) {
  const {
    node: { arguments: args }
  } = path;
  const len = args && args.length;

  if (len) {
    if (len > 1) {
      return t.sequenceExpression(args);
    } else {
      return args[0];
    }
  }
}

export function replaceInRenderBody(path, nodes) {
  nodes = [].concat(nodes);

  if (t.isProgram(path.parent)) {
    path.hub._renderBlock.pushContainer("body", nodes);
    path.remove();
  } else {
    path.replaceWithMultiple(nodes);
  }
}

export function insertBeforeInRenderBody(path, nodes) {
  nodes = [].concat(nodes);

  if (t.isProgram(path.parent)) {
    path.hub._renderBlock.unshiftContainer("body", nodes);
  } else {
    path.insertBefore(nodes);
  }
}
