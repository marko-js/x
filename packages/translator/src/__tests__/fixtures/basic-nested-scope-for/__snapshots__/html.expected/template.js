import { attr as _attr, escapeXML as _escapeXML, markResumeNode as _markResumeNode, write as _write, nextScopeId as _nextScopeId, writeEffect as _writeEffect, writeScope as _writeScope, maybeFlush as _maybeFlush, register as _register, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = _register((input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const selected = 0;
  for (const num of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
    const _scope1_id = _nextScopeId();
    _write(`<button${_attr("data-selected", selected === num)}${_attr("data-multiple", num % selected === 0)}>${_escapeXML(num)}${_markResumeNode(_scope1_id, "#text/1")}</button>${_markResumeNode(_scope1_id, "#button/0")}`);
    _writeEffect(_scope1_id, "packages/translator/src/__tests__/fixtures/basic-nested-scope-for/template.marko_1_num");
    _writeScope(_scope1_id, {
      "selected": selected,
      "num": num
    });
    _maybeFlush();
  }
}, "packages/translator/src/__tests__/fixtures/basic-nested-scope-for/template.marko");
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);