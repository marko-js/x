import * as t from "../../../definitions";
import withPreviousLocation from "../../../util/with-previous-location";

translate.parseOptions = { relaxRequireCommas: true };
export default translate;

// WIP
function translate(path) {
  const program = path.parent;
  if (!t.isProgram(program)) {
    throw path.buildCodeFrameError(
      "Import's must be at the root of your Marko template."
    );
  }

  const attrs = path.node.startTag.attributes;
  // use tagstring
  const importString = `import ${attrs.map(attr => attr.name).join(" ")}`;

  path.remove();
}
