import { toString as _toString, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = ({
  value
}, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  _write(`<em>Testing</em> <!>${_toString(value)}${_markHydrateNode(_scope0_id, "#text/0")}`);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);