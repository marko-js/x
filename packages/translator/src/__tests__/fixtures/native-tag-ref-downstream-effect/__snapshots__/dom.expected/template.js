import { register as _register, queueEffect as _queueEffect, createRenderer as _createRenderer, conditional as _conditional, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _setup$ifBody_effect = _register("packages/translator/src/__tests__/fixtures/native-tag-ref-downstream-effect/template.marko_1", _scope => _scope._["#div/0"].textContent = "hello");
const _setup$ifBody = _scope => {
  _queueEffect(_scope, _setup$ifBody_effect);
};
const _ifBody = /* @__PURE__ */_createRenderer("", "", _setup$ifBody);
const _if = /* @__PURE__ */_conditional("#text/1");
const _setup = _scope => {
  _if(_scope, true ? _ifBody : null);
};
export const template = "<div></div><!>";
export const walks = /* get, over(1), replace, over(1) */" b%b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, void 0, void 0, "packages/translator/src/__tests__/fixtures/native-tag-ref-downstream-effect/template.marko");