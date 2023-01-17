export const v = 123;
import { escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = ({
  value
}, _tagVar) => {
  const _scope = _nextScopeId();
  _write(`<div>${_escapeXML(value)}${_markHydrateNode(_scope, 0)}</div>`);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);