import { pushContext as _pushContext, dynamicTag as _dynamicTag, nextScopeId as _nextScopeId, popContext as _popContext, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  _pushContext("packages/translator/src/__tests__/fixtures/context-tag-from-tag-name/components/other.marko", "Hello");
  const _scope1_id = _nextScopeId();
  _dynamicTag(input.renderBody, null);
  _popContext();
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);