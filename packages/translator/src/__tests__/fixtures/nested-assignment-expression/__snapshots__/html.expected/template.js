import { escapeXML as _escapeXML, markResumeNode as _markResumeNode, write as _write, nextScopeId as _nextScopeId, writeEffect as _writeEffect, writeScope as _writeScope, register as _register, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = _register((input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const clickCount = 0;
  const lastCount = 0;
  const lastCount2 = 0;
  _write(`<button>${_escapeXML(clickCount)}${_markResumeNode(_scope0_id, "#text/1")}</button>${_markResumeNode(_scope0_id, "#button/0")}used to be <span>${_escapeXML(lastCount)}${_markResumeNode(_scope0_id, "#text/2")}</span> which should be the same as <span>${_escapeXML(lastCount2)}${_markResumeNode(_scope0_id, "#text/3")}</span>`);
  _writeEffect(_scope0_id, "packages/translator/src/__tests__/fixtures/nested-assignment-expression/template.marko_0_clickCount");
  _writeScope(_scope0_id, {
    "clickCount": clickCount
  }, _scope0_);
}, "packages/translator/src/__tests__/fixtures/nested-assignment-expression/template.marko");
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);