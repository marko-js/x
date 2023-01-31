import { pushContext as _pushContext, nextScopeId as _nextScopeId, popContext as _popContext, escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, writeHydrateCall as _writeHydrateCall, writeHydrateScope as _writeHydrateScope, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
import _child from "./components/child.marko";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const x = 123;
  _pushContext("packages/translator/src/__tests__/fixtures/context-tag-reactive/template.marko", x);
  const _scope1_id = _nextScopeId();
  _child({
    renderBody() {
      const _scope2_id = _nextScopeId();
    }
  });
  _popContext();
  _write(`<button id=increment>${_escapeXML(x)}${_markHydrateNode(_scope0_id, "#text/2")}</button>${_markHydrateNode(_scope0_id, "#button/1")}`);
  _writeHydrateCall(_scope0_id, "packages/translator/src/__tests__/fixtures/context-tag-reactive/template.marko_0_x");
  _writeHydrateScope(_scope0_id, {
    "x": x
  }, _scope0_);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);