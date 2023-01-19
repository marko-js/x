import { escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, writeHydrateCall as _writeHydrateCall, writeHydrateScope as _writeHydrateScope, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar) => {
  const _scope = _nextScopeId();
  const x = 1;
  const y = 1;
  _write(`<button>${_escapeXML(x)}${_markHydrateNode(_scope, "#text/1")}</button>${_markHydrateNode(_scope, "#button/0")}${_escapeXML(y)}${_markHydrateNode(_scope, "#text/2")}`);
  _writeHydrateCall(_scope, "packages/translator/src/__tests__/fixtures/let-tag/template.marko_0_x_y");
  _writeHydrateScope(_scope, {
    "x": x,
    "y": y
  });
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);