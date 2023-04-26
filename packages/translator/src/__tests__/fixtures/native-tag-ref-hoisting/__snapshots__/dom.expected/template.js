import { createRenderer as _createRenderer, conditional as _conditional, register as _register, queueEffect as _queueEffect, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _ifBody = /* @__PURE__ */_createRenderer("<div></div>", /* get */" ");
const _if = /* @__PURE__ */_conditional("#text/0");
const _setup_effect = _register("packages/translator/src/__tests__/fixtures/native-tag-ref-hoisting/template.marko_0", _scope => _scope._["#div/0"].textContent = "hello");
const _setup = _scope => {
  _queueEffect(_scope, _setup_effect);
  _if(_scope, true ? _ifBody : null);
};
export const template = "<!>";
export const walks = /* replace, over(1) */"%b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, null, null, "packages/translator/src/__tests__/fixtures/native-tag-ref-hoisting/template.marko");