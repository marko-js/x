import { setSource as _setSource, on as _on, queueSource as _queueSource, data as _data, tagVarSignal as _tagVarSignal, source as _source, register as _register, queueHydrate as _queueHydrate, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _hydrate_x = _register("packages/translator/src/__tests__/fixtures/custom-tag-var/components/child.marko_0_x", _scope => _on(_scope["#button/0"], "click", function () {
  const x = _scope["x"];
  _queueSource(_scope, _x, x + 1);
}));
const _x = /* @__PURE__ */_source("x", [_tagVarSignal], (_scope, x) => {
  _data(_scope["#text/1"], x);
  _setSource(_scope, _tagVarSignal, x);
  _queueHydrate(_scope, _hydrate_x);
});
const _setup = _scope => {
  _setSource(_scope, _x, 1);
};
export const template = "<button class=inc>&zwj;</button>";
export const walks = /* get, next(1), get, out(1) */" D l";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, null, null, "packages/translator/src/__tests__/fixtures/custom-tag-var/components/child.marko");