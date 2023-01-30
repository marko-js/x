import { write as _write, nextScopeId as _nextScopeId, writeHydrateScope as _writeHydrateScope, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const x = 1;
  const y = 2;
  _write("<span>child</span>");
  const _return = x + y;
<<<<<<< HEAD
  _writeHydrateScope(_scope0_, {
    "x": x,
    "y": y,
=======
  _writeHydrateScope(_scope0_id, {
>>>>>>> e11caa87 (fix(if-tag): undid Michael's changes from the last PR)
    "/": _tagVar
  }, _scope0_);
  return _return;
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);