import { nextScopeId as _nextScopeId, writeHydrateScope as _writeHydrateScope, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const _return = 1;
  _writeHydrateScope(_scope0_id, {
    "/": _tagVar
  }, _scope0_);
  return _return;
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);