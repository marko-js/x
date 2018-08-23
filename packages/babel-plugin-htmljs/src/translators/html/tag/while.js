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
  const [whileNode] = parse(rawValue + ";", start).body;
  whileNode.body = t.blockStatement(children.map(toStatement));

  if (t.isProgram(path.parent)) {
    path.remove();
    path.parent.renderBody.push(whileNode);
  } else {
    path.replaceWith(whileNode);
  }
}
