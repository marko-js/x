import { on as _on, queueSource as _queueSource, createRenderer as _createRenderer, dynamicTagAttrs as _dynamicTagAttrs, conditional as _conditional, register as _register, queueEffect as _queueEffect, value as _value, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _xBody = /* @__PURE__ */_createRenderer("Body Content", "");
const _x_input = _dynamicTagAttrs("#text/0", _xBody);
const _dynamicTagName = /* @__PURE__ */_conditional("#text/0", _scope => _x_input(_scope, () => ({})), void 0, _x_input);
const _x_effect = _register("packages/translator/src/__tests__/fixtures/dynamic-tag-sometimes-null/template.marko_0_x", _scope => _on(_scope["#button/1"], "click", function () {
  const {
    x
  } = _scope;
  _queueSource(_scope, _x, x ? null : "div");
}));
const _x = /* @__PURE__ */_value("x", (_scope, x) => {
  _queueEffect(_scope, _x_effect);
  _dynamicTagName(_scope, x || _xBody);
}, void 0, _dynamicTagName);
const _setup = _scope => {
  _x(_scope, null);
};
export const template = "<!><button></button>";
export const walks = /* replace, over(1), get, over(1) */"%b b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, void 0, void 0, "packages/translator/src/__tests__/fixtures/dynamic-tag-sometimes-null/template.marko");