import { escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, writeHydrateCall as _writeHydrateCall, writeHydrateScope as _writeHydrateScope, register as _register, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = _register((input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const count = 0;
  _write(`<button id=addTwo>${_escapeXML(count)}${_markHydrateNode(_scope0_id, "#text/1")}</button>${_markHydrateNode(_scope0_id, "#button/0")}<button id=triple>${_escapeXML(count)}${_markHydrateNode(_scope0_id, "#text/3")}</button>${_markHydrateNode(_scope0_id, "#button/2")}<button id=cube>${_escapeXML(count)}${_markHydrateNode(_scope0_id, "#text/5")}</button>${_markHydrateNode(_scope0_id, "#button/4")}`);
  _writeHydrateCall(_scope0_id, "packages/translator/src/__tests__/fixtures/reassignment-expression-counter/template.marko_0_count");
  _writeHydrateScope(_scope0_id, {
    "count": count
  }, _scope0_);
}, "packages/translator/src/__tests__/fixtures/reassignment-expression-counter/template.marko");
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);