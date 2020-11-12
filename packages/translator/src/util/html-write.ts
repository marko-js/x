import { Node, NodePath, Expression } from "@marko/babel-types";

export function writeHTML<T extends Node>(path: NodePath<T>) {
  const writes = (path.state.writes || (path.state.writes = [])) as Array<
    string | Expression
  >;
  return (strs: TemplateStringsArray, ...exprs: Array<string | Expression>) => {
    const exprsLen = exprs.length;

    for (let i = 0; i < exprsLen; i++) {
      writes.push(strs[i], exprs[i]);
    }

    writes.push(strs[exprsLen]);
  };
}
