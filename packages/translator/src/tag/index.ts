import { NodePath, MarkoTag } from "@marko/babel-types";
import { isNativeTag } from "@marko/babel-utils";
import * as NativeTag from "./native";

export function enter(path: NodePath<MarkoTag>) {
  if (isNativeTag(path)) {
    NativeTag.enter(path);
  }
}

export function exit(path: NodePath<MarkoTag>) {
  if (isNativeTag(path)) {
    NativeTag.exit(path);
  }
}
