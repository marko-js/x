import * as t from "../../../definitions";
import { toStatement } from "./_util";

export default translate;
translate.options = {
  rawOpenTag: true
};

function translate(path) {
  const {
    node,
    hub: {
      file: {
        ast: { parse }
      }
    }
  } = path;
  const { startTag, children } = node;
  const { rawValue, start } = startTag;
  const [forNode] = parse(rawValue + ";", start).body;
  forNode.body = t.blockStatement(children.map(toStatement));

  if (t.isProgram(path.parent)) {
    path.remove();
    path.parent.renderBody.push(forNode);
  } else {
    path.replaceWith(forNode);
  }
}
