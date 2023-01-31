import { attr as _attr, escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, writeHydrateCall as _writeHydrateCall, writeHydrateScope as _writeHydrateScope, maybeFlush as _maybeFlush, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const selected = 0;
  for (const num of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
<<<<<<< HEAD
    const _scope1_ = _nextScopeId();
    _write(`<button${_attr("data-selected", selected === num)}${_attr("data-multiple", num % selected === 0)}>${_escapeXML(num)}${_markHydrateNode(_scope1_, "#text/1")}</button>${_markHydrateNode(_scope1_, "#button/0")}`);
    _writeHydrateCall(_scope1_, "packages/translator/src/__tests__/fixtures/basic-nested-scope-for/template.marko_1_num");
    _writeHydrateScope(_scope1_, {
      "selected": selected,
=======
    const _scope1_id = _nextScopeId();
    _write(`<button${_attr("data-selected", selected === num)}${_attr("data-multiple", num % selected === 0)}>${_escapeXML(num)}${_markHydrateNode(_scope1_id, "#text/1")}</button>${_markHydrateNode(_scope1_id, "#button/0")}`);
    _writeHydrateCall(_scope1_id, "packages/translator/src/__tests__/fixtures/basic-nested-scope-for/template.marko_1_num");
    _writeHydrateScope(_scope1_id, {
>>>>>>> e11caa87 (fix(if-tag): undid Michael's changes from the last PR)
      "num": num
    }, undefined);
    _maybeFlush();
  }
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);