import { NodePath, MarkoTag } from "@marko/babel-types";
import { isOutputHTML } from "../../util/marko-config";
import * as translateHTML from "./html";
import * as translateDOM from "./dom";

export function enter(path: NodePath<MarkoTag>) {
  (isOutputHTML(path) ? translateHTML : translateDOM).enter(path);
}

export function exit(path: NodePath<MarkoTag>) {
  (isOutputHTML(path) ? translateHTML : translateDOM).exit(path);
}
