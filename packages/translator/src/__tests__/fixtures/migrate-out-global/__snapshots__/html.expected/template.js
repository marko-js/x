import { getInContext as _getInContext, escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const _$global = _getInContext("$");
  _write(`<div><span>${_escapeXML(_$global.x)}${_markHydrateNode(_scope0_id, "#text/0")}</span></div>`);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);