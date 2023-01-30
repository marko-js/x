import child1 from "./components/child1.marko";
import child2 from "./components/child2.marko";
import { nextScopeId as _nextScopeId, markHydrateNode as _markHydrateNode, write as _write, writeHydrateCall as _writeHydrateCall, writeHydrateScope as _writeHydrateScope, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const tagName = child1;
  const val = 3;
  tagName({
    value: val,
    renderBody() {
      const _scope1_id = _nextScopeId();
    }
  });
  _write(`<button></button>${_markHydrateNode(_scope0_id, "#button/0")}`);
  _writeHydrateCall(_scope0_id, "packages/translator/src/__tests__/fixtures/dynamic-tag-custom-tags/template.marko_0_tagName");
  _writeHydrateScope(_scope0_id, {
    "tagName": tagName
  }, _scope0_);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);