import { write as _write, nextScopeId as _nextScopeId, writeHydrateCall as _writeHydrateCall, writeHydrateScope as _writeHydrateScope, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const x = 1;
  _write("<div id=ref>0</div>");
  _writeHydrateCall(_scope0_id, "packages/translator/src/__tests__/fixtures/effect-tag/template.marko_0_x");
  _writeHydrateScope(_scope0_id, {
    "x": x
  }, _scope0_);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);