import { data as _data, source as _source, createRenderer as _createRenderer, setSource as _setSource, loop as _loop, destructureSources as _destructureSources, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _child$forBody = /* @__PURE__ */_source("child", [], (_scope, child) => _data(_scope["#text/0"], child.text));
const _forBody = /* @__PURE__ */_createRenderer("&zwj;", /* get */" ");
const _for = /* @__PURE__ */_loop("#text/0", 1, _forBody, [_child$forBody], (_scope, [child]) => _setSource(_scope, _child$forBody, child), (_scope, input = _scope["input"]) => [input.children, function (c) {
  return c.id;
}]);
const _input = /* @__PURE__ */_source("input", [_for]);
export const attrs = /* @__PURE__ */_destructureSources([_input], (_scope, input) => {
  _setSource(_scope, _input, input);
});
export { _input as _apply_input };
export const template = "<!>";
export const walks = /* replace, over(1) */"%b";
export const setup = function () {};
export default /* @__PURE__ */_createRenderFn(template, walks, setup, attrs, null, "packages/translator/src/__tests__/fixtures/move-and-clear-top-level/template.marko");