import * as t from "../../definitions";

export default function(path) {
  const {
    node: { body },
    hub
  } = path;

  if (t.isProgram(path.parent)) {
    path.remove();
    hub.renderBody.push(...body);
  } else {
    path.replaceWithMultiple(body);
  }
}
