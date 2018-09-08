import {
  TYPES,
  VISITOR_KEYS,
  FLIPPED_ALIAS_KEYS,
  DEPRECATED_KEYS,
  isType
} from "@babel/types";
import builder from "@babel/types/lib/builders/builder";
import defineType from "@babel/types/lib/definitions/utils";
import types from "./types";
import toCamelCase from "./util/to-camel-case";

Object.keys(types).forEach(typeName => defineType(typeName, types[typeName]));

// Update TYPES
for (const type of [
  ...Object.keys(VISITOR_KEYS),
  ...Object.keys(FLIPPED_ALIAS_KEYS),
  ...Object.keys(DEPRECATED_KEYS)
]) {
  if (!TYPES.includes(type)) TYPES.push(type);
}

// export babel stuff
export * from "@babel/types";

// export marko validators & builders
Object.keys(types).forEach(typeName => {
  exports[`is${typeName}`] = node => isType(typeName, node.type);
  exports[typeName] = exports[toCamelCase(typeName)] = (...args) =>
    builder(typeName, ...args);
});
