import { conditional as _conditional, value as _value, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _dynamicTagName = /* @__PURE__ */_conditional("#text/0");
const _input = /* @__PURE__ */_value("input", (_scope, input) => _dynamicTagName(_scope, input.renderBody), void 0, _dynamicTagName);
export const attrs = _input;
export { _input };
export const template = "<!>";
export const walks = /* replace, over(1) */"%b";
export const setup = function () {};
export default /* @__PURE__ */_createRenderFn(template, walks, setup, attrs, void 0, "packages/translator/src/__tests__/fixtures/custom-tag-render-body/components/child/index.marko");