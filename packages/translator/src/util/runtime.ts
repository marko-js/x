import { types as t, Node, NodePath } from "@marko/babel-types";
import { importNamed } from "@marko/babel-utils";
import { getMarkoOpts } from "./marko-config";

export function importRuntime<T extends Node>(path: NodePath<T>, name: string) {
  const { output, optimize } = getMarkoOpts(path);
  return importNamed(
    path.hub.file,
    `@marko/runtime-fluurt/${optimize ? "dist" : "debug"}/${output}`,
    name
  );
}

export function callRuntime<
  T extends Node,
  A extends Parameters<typeof t.callExpression>[1]
>(path: NodePath<T>, name: string, ...args: A) {
  return t.callExpression(importRuntime(path, name), args);
}
