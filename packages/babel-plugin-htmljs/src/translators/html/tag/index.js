export { default as base } from "./base";
export { default as import } from "./import";
export { default as static } from "./static";

import {
  if as conditionalIf,
  else as conditionalElse,
  elseIf
} from "./conditional";
export { conditionalIf as if, conditionalElse as else, elseIf };

export { default as for } from "./for";
