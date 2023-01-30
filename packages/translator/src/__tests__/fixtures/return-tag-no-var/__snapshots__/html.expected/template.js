import { nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
import _child from "./components/child.marko";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  _child({
    renderBody() {
      const _scope1_id = _nextScopeId();
    }
  });
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);