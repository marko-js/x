import { dynamicSubscribers as _dynamicSubscribers, initContextProvider as _initContextProvider, data as _data, contextClosure as _contextClosure, createRenderer as _createRenderer, derivation as _derivation, notifySignal as _notifySignal, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _x$putBody = _contextClosure("x", "packages/translator/src/__tests__/fixtures/context-tag-from-self/template.marko", [], (_scope, x) => _data(_scope["#text/0"], x));
const _putBody = /* @__PURE__ */_createRenderer("<span>&zwj;</span>", /* next(1), get */"D ", null, [_x$putBody]);
const _put = /* @__PURE__ */_derivation("0:", 1, [_dynamicSubscribers("0:")], _scope => 1);
const _setup = _scope => {
  _initContextProvider(_scope, "#text/0", "0:", "packages/translator/src/__tests__/fixtures/context-tag-from-self/template.marko", _putBody);
  _notifySignal(_scope, _put);
};
export const template = "<div><!></div>";
export const walks = /* next(1), replace, out(1) */"D%l";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, null, null, "packages/translator/src/__tests__/fixtures/context-tag-from-self/template.marko");