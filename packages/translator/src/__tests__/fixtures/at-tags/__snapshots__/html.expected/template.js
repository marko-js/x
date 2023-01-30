import { write as _write, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
import _hello from "./components/hello/index.marko";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  _hello({
    foo: {
      renderBody() {
        _write("Foo!");
      }
    },
    renderBody() {
      const _scope1_id = _nextScopeId();
    }
  });
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);