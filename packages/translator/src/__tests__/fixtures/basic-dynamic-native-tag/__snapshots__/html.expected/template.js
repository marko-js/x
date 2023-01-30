import { write as _write, dynamicTag as _dynamicTag, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = ({
  tagName
}, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  _dynamicTag(tagName, {
    class: ["a", "b"]
  }, () => _write("Hello World"));
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);