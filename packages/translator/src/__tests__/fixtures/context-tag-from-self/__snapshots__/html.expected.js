import { write as _write, pushContext as _pushContext, getInContext as _getInContext, markHydrateNode as _markHydrateNode, escapeXML as _escapeXML, popContext as _popContext, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";

const _renderer = input => {
  _write("<div>");

  _pushContext("packages/translator/src/__tests__/fixtures/context-tag-from-self/template.marko", 1);

  _write("<span>");

  const x = _getInContext("packages/translator/src/__tests__/fixtures/context-tag-from-self/template.marko");

  _write(`${_markHydrateNode(0)}${_escapeXML(x)}</span>`);

  _popContext();

  _write("</div>");

  const _scope = _nextScopeId();
};

export default _renderer;
export const render = _createRenderer(_renderer);