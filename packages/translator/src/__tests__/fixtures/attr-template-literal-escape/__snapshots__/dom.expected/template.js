import { attr as _attr, source as _source, setSource as _setSource, destructureSources as _destructureSources, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _name = /* @__PURE__ */_source("name", [], (_scope, name) => _attr(_scope["#div/0"], "foo", `Hello ${name}`));
export const attrs = /* @__PURE__ */_destructureSources([_name], (_scope, {
  name
}) => {
  _setSource(_scope, _name, name);
});
export { _name as _apply_name };
export const template = "<div></div>";
export const walks = /* get, over(1) */" b";
export const setup = function () {};
export default /* @__PURE__ */_createRenderFn(template, walks, setup, attrs, null, "packages/translator/src/__tests__/fixtures/attr-template-literal-escape/template.marko");