import { getInContext as _getInContext, escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const x = _getInContext("packages/translator/src/__tests__/fixtures/context-tag-reactive/template.marko");
  _write(`<div>${_escapeXML(x)}${_markHydrateNode(_scope0_id, "#text/0")}</div>`);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);