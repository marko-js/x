import * as t from "../../definitions";

export function toStatement(node) {
  if (t.isExpression(node)) {
    return t.expressionStatement(node);
  }

  return node;
}

export function assertIsRoot(path) {
  if (!t.isProgram(path.parent)) {
    throw path.buildCodeFrameError(
      `"${
        path.node.startTag.name.value
      }" tags must be at the root of your Marko template.`
    );
  }
}

export function assertAllowedAttributes(path, allowed) {
  const {
    node: { startTag }
  } = path;
  startTag.attributes.forEach((attr, i) => {
    if (!allowed.includes(attr.name)) {
      throw path
        .get(`startTag.attributes.${i}`)
        .buildCodeFrameError(
          `Invalid "${startTag.name.value}" tag attribute: "${attr.name}".`
        );
    }
  });
}

export function assertNoParams(path) {
  const {
    node: { startTag }
  } = path;
  const { params } = startTag;
  if (params.length) {
    throw path.buildCodeFrameError(
      `"${startTag.name.value}" tag does not support parameters.`
    );
  }
}

export function replaceInRenderBody(path, nodes) {
  nodes = [].concat(nodes);

  if (t.isProgram(path.parent)) {
    path.remove();
    path.hub._renderBody.push(...nodes);
  } else {
    path.replaceWithMultiple(nodes);
  }
}

export function insertBeforeInRenderBody(path, nodes) {
  nodes = [].concat(nodes);

  if (t.isProgram(path.parent)) {
    path.hub._renderBody.unshift(...nodes);
  } else {
    debugger;
    path.insertBefore(nodes);
  }
}
