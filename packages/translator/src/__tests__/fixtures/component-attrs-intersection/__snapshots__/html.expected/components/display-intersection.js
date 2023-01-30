import { escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, writeHydrateScope as _writeHydrateScope, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = ({
  value
}, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const dummy = {};
  _write(`<div>${_escapeXML((dummy, value))}${_markHydrateNode(_scope0_, "#text/0")}</div>`);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);