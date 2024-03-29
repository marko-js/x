import { data as _data, value as _value, createRenderer as _createRenderer, loopOf as _loopOf, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _child$forBody = /* @__PURE__ */_value("child", (_scope, child) => _data(_scope["#text/0"], child.text));
const _forBody = /* @__PURE__ */_createRenderer(" ", /* get */" ", void 0, void 0, void 0, void 0, void 0, void 0, (_scope, _destructure, _clean) => {
  let child;
  if (!_clean) ({
    value: [child]
  } = _destructure);
  _child$forBody(_scope, child, _clean);
});
const _for = /* @__PURE__ */_loopOf("#div/0", _forBody);
const _children = /* @__PURE__ */_value("children", (_scope, children) => _for(_scope, [children, function (c) {
  return c.id;
}]));
export const attrs = (_scope, _destructure2, _clean) => {
  let children;
  if (!_clean) ({
    children
  } = _destructure2);
  _children(_scope, children, _clean);
};
export { _children };
export const template = "<div></div>";
export const walks = /* get, over(1) */" b";
export const setup = function () {};
export default /* @__PURE__ */_createRenderFn(template, walks, setup, attrs, void 0, "packages/translator/src/__tests__/fixtures/remove-and-add-rows/template.marko");