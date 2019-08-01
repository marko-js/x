import * as t from "../../../src/definitions";

export default () => ({
  Identifier(path) {
    if (path.node.name === "before") {
      path.replaceWith(t.identifier("after"));
    }
  }
});
