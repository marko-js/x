import * as t from "./definitions";
import traverse from "@babel/traverse";

export function translate(ast) {
  traverse(ast, {
    HTMLElement() {}
  });
  return ast;
}
