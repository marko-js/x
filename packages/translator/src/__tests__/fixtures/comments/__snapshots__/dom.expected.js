export const template = "<div><!--abc--><!--[if lt IE 9]><script src=\"...\"></script><![endif]--></div>";
export const walks =
/* over(1) */
"b";
export const setup = function () {};
import { createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
export default _createRenderFn(template, walks, setup);