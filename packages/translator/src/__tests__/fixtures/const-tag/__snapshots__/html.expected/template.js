import { escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const x = 1;
  const y = 1;
  _write(`<div>${_escapeXML(x)}${_markHydrateNode(_scope0_id, "#text/0")}</div>${_escapeXML(y)}${_markHydrateNode(_scope0_id, "#text/1")}`);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);