<<<<<<< HEAD
import { escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, writeHydrateScope as _writeHydrateScope, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar) => {
  const _scope0_ = _nextScopeId();
  const a = 0;
  const b = 0;
  if (true) {
    const _scope1_ = _nextScopeId();
    _write(`${_escapeXML(a + b)}${_markHydrateNode(_scope1_, "#text/0")}`);
    _writeHydrateScope(_scope1_, {
      "a": a,
      "b": b
    });
=======
import { escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const a = 0;
  const b = 0;
  if (true) {
    const _scope1_id = _nextScopeId();
    _write(`${_escapeXML(a + b)}${_markHydrateNode(_scope1_id, "#text/0")}`);
>>>>>>> e11caa87 (fix(if-tag): undid Michael's changes from the last PR)
  }
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);