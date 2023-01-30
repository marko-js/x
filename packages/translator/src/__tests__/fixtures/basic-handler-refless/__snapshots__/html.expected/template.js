import { escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, writeHydrateCall as _writeHydrateCall, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const data = 0;
  _write(`<button>${_escapeXML(data)}${_markHydrateNode(_scope0_id, "#text/1")}</button>${_markHydrateNode(_scope0_id, "#button/0")}`);
  _writeHydrateCall(_scope0_id, "packages/translator/src/__tests__/fixtures/basic-handler-refless/template.marko_0");
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);