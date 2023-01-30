import { write as _write, getInContext as _getInContext, escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  _write("<div><span>");
  const {
    x
  } = _getInContext("$");
  _write(`${_escapeXML(x)}${_markHydrateNode(_scope0_id, "#text/0")}</span></div>`);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);