export const v = 123;
import { data as _data, source as _source, setSource as _setSource, destructureSources as _destructureSources, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _value = /* @__PURE__ */_source("value", [], (_scope, value) => _data(_scope["#text/0"], value));
export const attrs = /* @__PURE__ */_destructureSources([_value], (_scope, {
  value
}) => {
  _setSource(_scope, _value, value);
});
export { _value as _apply_value };
export const template = "<div>&zwj;</div>";
export const walks = /* next(1), get, out(1) */"D l";
export const setup = function () {};
export default /* @__PURE__ */_createRenderFn(template, walks, setup, attrs, null, "packages/translator/src/__tests__/fixtures/basic-export/template.marko");