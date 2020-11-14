import { NodePath, MarkoTag } from "@marko/babel-types";

export function enter() {}

export function exit(path: NodePath<MarkoTag>) {
  path.remove();
}
