import { asset as asset1 } from "./asset1";
import { asset as asset2 } from "./asset2";
import { data as _data, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";

const _setup = _scope => {
  _data(_scope[0], asset1);

  _data(_scope[1], asset2);
};

export const template = "<!> <!>";
export const walks =
/* replace, over(2), replace, over(1) */
"%c%b";
export const setup = _setup;
export default _createRenderFn(template, walks, setup);