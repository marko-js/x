import { write as _write, nextScopeId as _nextScopeId, writeHydrateCall as _writeHydrateCall, writeHydrateScope as _writeHydrateScope, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar) => {
  const _scope = _nextScopeId();
  const x = 1;
  _write("<div id=ref>0</div>");
  _writeHydrateCall(_scope, "packages/translator/src/__tests__/fixtures/effect-tag/template.marko_0_x");
  _writeHydrateScope(_scope, {
    0: x
  });
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);