import { nextScopeId as _nextScopeId, writeHydrateCall as _writeHydrateCall, writeHydrateScope as _writeHydrateScope, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = ({
  el
}, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  _writeHydrateCall(_scope0_id, "packages/translator/src/__tests__/fixtures/native-tag-ref-effect-child/components/hello-setter.marko_0_el");
  _writeHydrateScope(_scope0_id, {
    "el": el
  }, _scope0_);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);