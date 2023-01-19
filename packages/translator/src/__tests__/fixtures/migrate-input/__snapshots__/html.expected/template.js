import { escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar) => {
  const _scope = _nextScopeId();
  _write(`<div><span>${_escapeXML(input.x)}${_markHydrateNode(_scope, "#text/0")}</span></div>`);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);