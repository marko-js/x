import { register as _register, queueEffect as _queueEffect, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _setup_effect = _register("packages/translator/src/__tests__/fixtures/native-tag-ref-effect/template.marko_0", _scope => _scope["#div/0"].textContent = "hello");
const _setup = _scope => {
  _queueEffect(_scope, _setup_effect);
};
export const template = "<div></div>";
export const walks = /* get, over(1) */" b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, void 0, void 0, "packages/translator/src/__tests__/fixtures/native-tag-ref-effect/template.marko");