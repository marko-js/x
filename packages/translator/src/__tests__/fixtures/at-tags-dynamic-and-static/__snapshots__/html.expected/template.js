import { nextScopeId as _nextScopeId, maybeFlush as _maybeFlush, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
import _hello from "./components/hello/index.marko";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const _item = [];
  const _scope1_id = _nextScopeId();
  for (const a in {
    a: 1,
    b: 2
  }) {
    const _scope2_id = _nextScopeId();
    _item.push({});
    _maybeFlush();
  }
  _hello({
    item: _item,
    other: {}
  });
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);