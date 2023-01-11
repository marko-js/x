import { setSource as _setSource, lifecycle as _lifecycle, on as _on, queueSource as _queueSource, inConditionalScope as _inConditionalScope, closure as _closure, register as _register, queueHydrate as _queueHydrate, bind as _bind, createRenderer as _createRenderer, conditional as _conditional, source as _source, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _onMount = function (_scope) {
  const x = _scope._[8];
  document.getElementById("ref").textContent = "Mount " + x;
};
const _onUpdate = function (_scope) {
  const x = _scope._[8];
  document.getElementById("ref").textContent = "Update " + x;
};
const _temp = function (_scope) {
  document.getElementById("ref").textContent = "Destroy";
};
const _hydrate_x$ifBody = _register("packages/translator/src/__tests__/fixtures/lifecycle-tag-conditional/template.marko_1_x", _scope => {
  const x = _scope._[8];
  _lifecycle(_scope, 0, {
    onMount: /* @__PURE__ */_bind(_scope, _onMount),
    onUpdate: /* @__PURE__ */_bind(_scope, _onUpdate),
    onDestroy: /* @__PURE__ */_bind(_scope, _temp)
  });
});
const _x$ifBody = /* @__PURE__ */_closure(1, 8, [], (_scope, x) => _queueHydrate(_scope, _hydrate_x$ifBody));
const _ifBody = /* @__PURE__ */_createRenderer("", "", null, [_x$ifBody]);
const _if = /* @__PURE__ */_conditional(0, 1, (_scope, show = _scope[9]) => show ? _ifBody : null);
const _onClick = function (_scope) {
  const show = _scope[9];
  _queueSource(_scope, _show, !show);
};
const _hydrate_show = _register("packages/translator/src/__tests__/fixtures/lifecycle-tag-conditional/template.marko_0_show", _scope => {
  const show = _scope[9];
  _on(_scope[7], "click", /* @__PURE__ */_bind(_scope, _onClick));
});
const _show = /* @__PURE__ */_source(9, [_if], (_scope, show) => _queueHydrate(_scope, _hydrate_show));
const _onClick2 = function (_scope) {
  const x = _scope[8];
  _queueSource(_scope, _x, x + 1), x;
};
const _hydrate_x = _register("packages/translator/src/__tests__/fixtures/lifecycle-tag-conditional/template.marko_0_x", _scope => {
  const x = _scope[8];
  _on(_scope[6], "click", /* @__PURE__ */_bind(_scope, _onClick2));
});
const _x = /* @__PURE__ */_source(8, [/* @__PURE__ */_inConditionalScope(_x$ifBody, 0)], (_scope, x) => _queueHydrate(_scope, _hydrate_x));
const _setup = _scope => {
  _setSource(_scope, _x, 0);
  _setSource(_scope, _show, true);
};
export const template = "<!><div id=ref></div><button id=increment>Increment</button><button id=toggle>Toggle</button>";
export const walks = /* replace, skip(5), over(2), get, over(1), get, over(1) */"%-c b b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup);