import * as t from "../definitions";
import optimize from "./optimize";

// Stores common utilities on `path.hub`.
export default {
  enter(path) {
    const { hub } = path;
    const {
      file: {
        ast: { lookup, parse, parseExpression }
      }
    } = hub;

    Object.assign(hub, {
      lookup,
      parse,
      parseExpression,
      renderBody: []
    });
  },

  // Creates the final render function and runs optimizations.
  exit(path) {
    const { node, hub } = path;
    node.body.push(
      t.functionDeclaration(
        t.identifier("render"),
        [t.identifier("out")],
        Object.assign(t.blockStatement([]), { body: hub.renderBody })
      )
    );

    path.traverse(optimize);
  }
};
