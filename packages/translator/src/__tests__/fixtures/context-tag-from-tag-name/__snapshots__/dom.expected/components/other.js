import { initContextProvider as _initContextProvider, conditional as _conditional, dynamicClosure as _dynamicClosure, createRenderer as _createRenderer, dynamicSubscribers as _dynamicSubscribers, value as _value, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _dynamicTagName$putBody = /* @__PURE__ */_conditional("#text/0");
const _input$putBody = /* @__PURE__ */_dynamicClosure("input", (_scope, input) => _dynamicTagName$putBody(_scope, input.renderBody), null, null, _dynamicTagName$putBody);
const _putBody = /* @__PURE__ */_createRenderer("<!>", /* replace */"%", null, [_input$putBody]);
const _put = /* @__PURE__ */_value("0:", null, _dynamicSubscribers("0:"));
const _input = /* @__PURE__ */_value("input", null, _dynamicSubscribers("input"));
const _setup = _scope => {
  _initContextProvider(_scope, "#text/0", "0:", "packages/translator/src/__tests__/fixtures/context-tag-from-tag-name/components/other.marko", _putBody);
  _put(_scope, "Hello");
};
export const attrs = _input;
export { _input };
export const template = "<!>";
export const walks = /* replace, over(1) */"%b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, attrs, null, "packages/translator/src/__tests__/fixtures/context-tag-from-tag-name/components/other.marko");