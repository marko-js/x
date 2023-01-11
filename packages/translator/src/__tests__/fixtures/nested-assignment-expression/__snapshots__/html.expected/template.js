import { markHydrateNode as _markHydrateNode, escapeXML as _escapeXML, write as _write, nextScopeId as _nextScopeId, writeHydrateCall as _writeHydrateCall, writeHydrateScope as _writeHydrateScope, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar) => {
  const _scope = _nextScopeId();
  const clickCount = 0;
  const lastCount = 0;
  const lastCount2 = 0;
  _write(`${_markHydrateNode(_scope, 0)}<button>${_markHydrateNode(_scope, 1)}${_escapeXML(clickCount)}</button>used to be <span>${_markHydrateNode(_scope, 2)}${_escapeXML(lastCount)}</span> which should be the same as <span>${_markHydrateNode(_scope, 3)}${_escapeXML(lastCount2)}</span>`);
  _writeHydrateCall(_scope, "packages/translator/src/__tests__/fixtures/nested-assignment-expression/template.marko_0_clickCount");
  _writeHydrateScope(_scope, {
    4: clickCount
  });
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);