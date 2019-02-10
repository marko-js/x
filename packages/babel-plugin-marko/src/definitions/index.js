import * as babelTypes from "@babel/types";
import { NodePath } from "@babel/traverse";
import builder from "@babel/types/lib/builders/builder";
import defineType from "@babel/types/lib/definitions/utils";
import types from "./types";

const {
  TYPES,
  VISITOR_KEYS,
  FLIPPED_ALIAS_KEYS,
  DEPRECATED_KEYS,
  is
} = babelTypes;

export const MARKO_TYPES = Object.keys(types);
MARKO_TYPES.forEach(typeName => defineType(typeName, types[typeName]));

// Update TYPES
for (const type of [
  ...Object.keys(VISITOR_KEYS),
  ...Object.keys(FLIPPED_ALIAS_KEYS),
  ...Object.keys(DEPRECATED_KEYS)
]) {
  if (!TYPES.includes(type)) TYPES.push(type);
}

// add marko validators & builders to `@babel/types` and `@babel/traverse`
MARKO_TYPES.forEach(typeName => {
  const upperName = typeName[0].toLowerCase() + typeName.slice(1);
  const isTypeKey = `is${typeName}`;
  const assertKey = `assert${upperName}`;
  const isTypeFn = (babelTypes[isTypeKey] = (node, opts) =>
    is(typeName, node, opts));
  const assertFn = (babelTypes[assertKey] = (node, opts) =>
    assert(typeName, node, opts));
  NodePath.prototype[isTypeKey] = function(opts) {
    return isTypeFn(this.node, opts);
  };
  NodePath.prototype[assertKey] = function(opts) {
    assertFn(this.node, opts);
  };
  // Add builder.
  babelTypes[typeName] = babelTypes[upperName] = (...args) =>
    builder(typeName, ...args);
});

function assert(typeName, node, opts) {
  if (!is(typeName, node, opts)) {
    throw new Error(
      `Expected type "${typeName}" with option ${JSON.stringify(
        opts
      )}, but instead got "${node.type}".`
    );
  }
}

// export babel stuff
Object.assign(exports, babelTypes);
export * from "@babel/types";
