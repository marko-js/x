import { pushContext as _pushContext, nextScopeId as _nextScopeId, popContext as _popContext, escapeXML as _escapeXML, markResumeNode as _markResumeNode, write as _write, writeEffect as _writeEffect, writeScope as _writeScope, register as _register, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
import _child from "./components/child.marko";
const _renderer = _register((input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const x = 123;
  _pushContext("packages/translator/src/__tests__/fixtures/context-tag-reactive/template.marko", x);
  const _scope1_id = _nextScopeId();
  _child({
    renderBody() {
      const _scope2_id = _nextScopeId();
    }
  });
  _popContext();
  _write(`<button id=increment>${_escapeXML(x)}${_markResumeNode(_scope0_id, "#text/2")}</button>${_markResumeNode(_scope0_id, "#button/1")}`);
  _writeEffect(_scope0_id, "packages/translator/src/__tests__/fixtures/context-tag-reactive/template.marko_0_x");
  _writeScope(_scope0_id, {
    "x": x
  }, _scope0_);
}, "packages/translator/src/__tests__/fixtures/context-tag-reactive/template.marko");
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);