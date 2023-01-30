import { write as _write, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
import _child from "./components/child/index.marko";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  _child({
    name: "World",
    renderBody() {
      const _scope1_id = _nextScopeId();
      _write("This is the body content");
    }
  });
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);