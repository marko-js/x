import { setSource as _setSource, tagVarSignal as _tagVarSignal, source as _source, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _x = /* @__PURE__ */_source(0, [_tagVarSignal], (_scope, x) => _setSource(_scope, _tagVarSignal, x + 3));
const _setup = _scope => {
  _setSource(_scope, _x, 1);
};
export const template = "<span>child</span>";
export const walks = /* over(1) */"b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup);