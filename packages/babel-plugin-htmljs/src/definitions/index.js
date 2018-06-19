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

Object.keys(types).forEach(typeName => defineType(typeName, types[typeName]));

// Update TYPES
const allTypes = [
  ...Object.keys(VISITOR_KEYS),
  ...Object.keys(FLIPPED_ALIAS_KEYS),
  ...Object.keys(DEPRECATED_KEYS)
];
for (let type of allTypes) {
  if (TYPES.indexOf(type) < 0) TYPES.push(type);
}

// export babel stuff
export * from "@babel/types";

// export marko validators & builders
Object.keys(types).forEach(typeName => {
  exports[`is${typeName}`] = node => isType(typeName, node.type);
  exports[typeName] = exports[camelName(typeName)] = (...args) =>
    builder(typeName, ...args);
});

function camelName(name) {
  if (name.slice(0, 4) === "HTML") {
    return "html" + name.slice(4);
  } else {
    return name.slice(0, 1).toLowerCase() + name.slice(1);
  }
}
