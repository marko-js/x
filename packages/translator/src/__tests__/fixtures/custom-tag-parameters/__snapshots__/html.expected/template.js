import { escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
import _customTag from "./components/custom-tag.marko";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  _customTag({
    renderBody(a, b, {
      c
    }) {
      const _scope1_id = _nextScopeId();
      _write(`<div>${_escapeXML(a)}${_markHydrateNode(_scope1_id, "#text/0")} <!>${_escapeXML(b)}${_markHydrateNode(_scope1_id, "#text/1")} <!>${_escapeXML(c)}${_markHydrateNode(_scope1_id, "#text/2")}</div>`);
    }
  });
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);