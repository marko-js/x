import { types as t, NodePath, Visitor } from "@marko/babel-types";
import { callRuntime } from "./runtime";

type VisitorState = { isStateful: boolean };

const StatefulVisitor: Visitor<VisitorState> = {
  enter(path, state) {
    if (isStatefulPath(path, state)) {
      path.stop();
    }
  }
};

export function beginMaybeStatefulNode(path: NodePath<any>) {
  const { state } = path;
  const writes = (state.writes || (state.writes = [])) as Array<
    string | t.Expression
  >;

  const visitorState = { isStateful: false };
  const index = writes.length;
  writes.push("");

  return (expr: NodePath<any>) => {
    if (visitorState.isStateful) {
      return true;
    }

    if (writes !== state.writes) {
      throw new Error(
        "Cannot mark a node as stateful after it's html has been flushed."
      );
    }

    if (isStatefulPath(expr, visitorState)) {
      writes[index] = callRuntime(expr, "hydrateMarker");
      return true;
    }

    return false;
  };
}

export function maybeStatefulNode(expr: NodePath<any>) {
  if (isStatefulPath(expr, { isStateful: false })) {
    const writes = (expr.state.writes || (expr.state.writes = [])) as Array<
      string | t.Expression
    >;

    writes.push(callRuntime(expr, "hydrateMarker"));
    return true;
  }

  return false;
}

function isStatefulPath(id: NodePath<any>, state: VisitorState) {
  if (id.isIdentifier()) {
    const { scope } = id;
    const { name } = id.node;
    const binding = scope.getBinding(name);

    if (binding) {
      if (binding.kind === "const") {
        // If not a tag var or param we dig into the initializer for the definition to see if it is stateful.
        const init = (binding.path as NodePath<t.VariableDeclarator>).get(
          "init"
        );
        if (isStatefulPath(init, state)) {
          return true;
        } else {
          init.traverse(StatefulVisitor, state);
          return state.isStateful;
        }
      } else if ((binding.kind as "marko") === "marko" && name === "input") {
        state.isStateful = true;
        return true;
      } else {
        // Check for let, tag vars and tag params
        return true;
      }
    }
  }

  return false;
}
