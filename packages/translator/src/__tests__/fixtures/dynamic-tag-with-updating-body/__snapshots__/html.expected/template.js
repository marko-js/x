import { write as _write, nextScopeId as _nextScopeId, markHydrateNode as _markHydrateNode, writeHydrateCall as _writeHydrateCall, writeHydrateScope as _writeHydrateScope, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
import _counter from "./components/counter.marko";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const tagName = "div";
  _write(`<${tagName}>`);
  _counter({
    renderBody() {
      const _scope1_id = _nextScopeId();
    }
  });
  _write(`</${tagName}><button id=changeTag></button>${_markHydrateNode(_scope0_id, "#button/1")}`);
  _writeHydrateCall(_scope0_id, "packages/translator/src/__tests__/fixtures/dynamic-tag-with-updating-body/template.marko_0_tagName");
  _writeHydrateScope(_scope0_id, {
    "tagName": tagName
  }, _scope0_);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);