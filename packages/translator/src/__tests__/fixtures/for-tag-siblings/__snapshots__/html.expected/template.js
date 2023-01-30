import { write as _write, escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, nextScopeId as _nextScopeId, maybeFlush as _maybeFlush, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const arrA = [1, 2, 3];
  _write("<div>");
  for (const val of arrA) {
    const _scope1_id = _nextScopeId();
    _write(`<div>${_escapeXML(val)}${_markHydrateNode(_scope1_id, "#text/0")}</div>`);
    _maybeFlush();
  }
  _write(`</div>${_markHydrateNode(_scope0_id, "#div/0")}<div>`);
  for (const val of arrA) {
    const _scope2_id = _nextScopeId();
    _write(`<div>${_escapeXML(val)}${_markHydrateNode(_scope2_id, "#text/0")}</div>`);
    _maybeFlush();
  }
  _write("<div></div></div>");
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);