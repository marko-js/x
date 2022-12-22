import { createRenderer as _createRenderer, conditional as _conditional, notifySignal as _notifySignal, register as _register, queueHydrate as _queueHydrate, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _ifBody = /* @__PURE__ */_createRenderer("<div></div>", /* get */" ");
const _if = /* @__PURE__ */_conditional(0, 1, _scope => true ? _ifBody : null);
const _hydrate_setup = _register("packages/translator/src/__tests__/fixtures/native-tag-ref-hoisting/template.marko_0", _scope => _scope._[0].textContent = "hello");
const _setup = _scope => {
  _notifySignal(_scope, _if);
  _queueHydrate(_scope, _hydrate_setup);
};
export const template = "<!>";
export const walks = /* replace, skip(5), over(1) */"%-b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup);