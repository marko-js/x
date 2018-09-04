import * as t from "../../definitions";
import { assertIsRoot } from "./util";

export default function(path) {
  assertIsRoot(path);

  const { node, hub } = path;
  const { startTag } = node;
  const { rawValue } = startTag;
  const code = rawValue.replace(/^static\s*/, "").trim();
  const start = startTag.start + (rawValue.length - code.length);
  let { body } = hub.parse(code, start);
  if (body.length === 1 && t.isBlockStatement(body[0])) {
    body = body[0].body;
  }

  path.replaceWithMultiple(body);
}
