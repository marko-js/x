import * as t from "../../definitions";

export function exit(path) {
  const { node, hub } = path;
  const {
    rawValue,
    start,
    body: { body }
  } = node;
  const [whileNode] = hub.parse(rawValue + ";", start).body;
  whileNode.body = t.blockStatement(body);
  path.replaceWith(whileNode);
}
