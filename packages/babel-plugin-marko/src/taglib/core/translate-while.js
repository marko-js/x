import * as t from "../../definitions";
import { replaceInRenderBody, toStatement } from "./util";

export default function(path) {
  const { node, hub } = path;
  const { startTag, children } = node;
  const { rawValue, start } = startTag;
  const [whileNode] = hub.parse(rawValue + ";", start).body;
  whileNode.body = t.blockStatement(children.map(toStatement));
  replaceInRenderBody(path, whileNode);
}
