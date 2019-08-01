import * as t from "../../../src/definitions";

export default () => ({
  Identifier(path) {
    if (path.node.name === "old") {
      path.replaceWith(t.identifier("new"));
    }
  }
});
