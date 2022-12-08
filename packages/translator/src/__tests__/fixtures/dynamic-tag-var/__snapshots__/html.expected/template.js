import child from "./components/child/index.marko";
import { nextScopeId as _nextScopeId, markHydrateNode as _markHydrateNode, write as _write, dynamicTag as _dynamicTag, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = ({
  show,
  dynamic
}) => {
  const _scope = _nextScopeId();
  const data1 = child({
    renderBody() {
      const _scope = _nextScopeId();
    }
  });
  const _tagName = show && child;
  function _renderBody() {
    const _scope = _nextScopeId();
  }
  let data2 = void 0;
  if (_tagName) data2 = _tagName();else _renderBody();
  _write(`${_markHydrateNode(_scope, 0)}`);
  const data3 = _dynamicTag(dynamic, null);
  const _tagName2 = show && "div";
  const el1 = () => {
    throw new Error("Cannot reference DOM node from server");
  };
  if (_tagName2) _write(`${_markHydrateNode(_scope, 6)}<${_tagName2}></${_tagName2}>`);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);