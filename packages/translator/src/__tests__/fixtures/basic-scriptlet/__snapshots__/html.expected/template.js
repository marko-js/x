import { escapeXML as _escapeXML, markResumeNode as _markResumeNode, write as _write, nextScopeId as _nextScopeId, writeEffect as _writeEffect, writeScope as _writeScope, register as _register, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = _register((input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const clickCount = 0;
  const doubleCount = clickCount * 2;
  _write(`<div><button>${_escapeXML(doubleCount)}${_markResumeNode(_scope0_id, "#text/1")}</button>${_markResumeNode(_scope0_id, "#button/0")}</div>`);
  _writeEffect(_scope0_id, "packages/translator/src/__tests__/fixtures/basic-scriptlet/template.marko_0_clickCount");
  _writeScope(_scope0_id, {
    "clickCount": clickCount
  }, _scope0_);
}, "packages/translator/src/__tests__/fixtures/basic-scriptlet/template.marko");
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);