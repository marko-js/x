import { on as _on, queueSource as _queueSource, data as _data, register as _register, queueEffect as _queueEffect, intersection as _intersection, value as _value, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _expr_x_y_effect = _register("packages/translator/src/__tests__/fixtures/let-tag/template.marko_0_x_y", _scope => _on(_scope["#button/0"], "click", () => {
  const {
    x,
    y
  } = _scope;
  return _queueSource(_scope, _x, _queueSource(_scope, _y, x + y));
}));
const _expr_x_y = /* @__PURE__ */_intersection(2, _scope => {
  const {
    x,
    y
  } = _scope;
  _queueEffect(_scope, _expr_x_y_effect);
});
const _y = /* @__PURE__ */_value("y", (_scope, y) => _data(_scope["#text/2"], y), _expr_x_y);
const _x = /* @__PURE__ */_value("x", (_scope, x) => _data(_scope["#text/1"], x), _expr_x_y);
const _setup = _scope => {
  _x(_scope, 1);
  _y(_scope, 1);
};
export const template = "<button> </button><!>";
export const walks = /* get, next(1), get, out(1), replace, over(1) */" D l%b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, void 0, void 0, "packages/translator/src/__tests__/fixtures/let-tag/template.marko");