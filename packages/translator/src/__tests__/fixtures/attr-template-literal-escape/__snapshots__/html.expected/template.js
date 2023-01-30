import { attr as _attr, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = ({
  name
}, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  _write(`<div${_attr("foo", `Hello ${name}`)}></div>${_markHydrateNode(_scope0_id, "#div/0")}`);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);