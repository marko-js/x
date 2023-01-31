import { escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, maybeFlush as _maybeFlush, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const arrA = [1, 2, 3];
  let _i = 0;
  for (const val of arrA) {
    let i = _i++;
    const _scope1_id = _nextScopeId();
    _write(`<div>${_escapeXML(i)}${_markHydrateNode(_scope1_id, "#text/0")}: <!>${_escapeXML(val)}${_markHydrateNode(_scope1_id, "#text/1")}</div>`);
    _maybeFlush();
  }
  const arrB = [1, 2, 3];
  let _i2 = 0;
  for (const val of arrB) {
    let i = _i2++;
    const _scope2_id = _nextScopeId();
    _write(`<div>${_escapeXML(i)}${_markHydrateNode(_scope2_id, "#text/0")}: <!>${_escapeXML(val)}${_markHydrateNode(_scope2_id, "#text/1")}</div>`);
    _maybeFlush();
  }
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);