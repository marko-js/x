import { write as _write, nextScopeId as _nextScopeId, writeHydrateScope as _writeHydrateScope, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar) => {
  const _scope = _nextScopeId();
  const x = 1;
  _write("<span>child</span>");
  const _return = x;
  _writeHydrateScope(_scope, {
    "/": _tagVar
  });
  return _return;
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);