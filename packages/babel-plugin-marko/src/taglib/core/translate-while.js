import * as t from "../../definitions";
import { replaceInRenderBody, toStatement } from "./util";

export default function(path) {
  const { node, hub } = path;
  const { rawValue, start, body } = node;
  const [whileNode] = hub.parse(rawValue + ";", start).body;
  whileNode.body = t.blockStatement(body.map(toStatement));
  replaceInRenderBody(path, whileNode);
}
