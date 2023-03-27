import { dynamicTagAttrs as _dynamicTagAttrs, on as _on, queueSource as _queueSource, createRenderer as _createRenderer, conditional as _conditional, register as _register, queueHydrate as _queueHydrate, value as _value, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _xBody = /* @__PURE__ */_createRenderer("Body Content", "");
const _dynamicTagName = /* @__PURE__ */_conditional("#text/0", (_scope, _dirty) => {
  if (_dirty) {
    _dynamicBody_attrs = () => ({});
  }
  var _dynamicBody_attrs;
  _dynamicTagAttrs(_scope, "#text/0", _dynamicBody_attrs, _xBody, _dirty);
});
const _hydrate_x = _register("packages/translator/src/__tests__/fixtures/dynamic-tag-sometimes-null/template.marko_0_x", _scope => _on(_scope["#button/1"], "click", function () {
  const x = _scope["x"];
  _queueSource(_scope, _x, x ? null : "div");
}));
const _x = /* @__PURE__ */_value("x", (_scope, x, _dirty) => {
  if (_dirty) {
    _dynamicTagName_value = x || _xBody;
    _queueHydrate(_scope, _hydrate_x);
  }
  var _dynamicTagName_value;
  _dynamicTagName(_scope, _dynamicTagName_value, _dirty);
});
const _setup = _scope => {
  _x(_scope, null);
};
export const template = "<!><button></button>";
export const walks = /* replace, over(1), get, over(1) */"%b b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, null, null, "packages/translator/src/__tests__/fixtures/dynamic-tag-sometimes-null/template.marko");