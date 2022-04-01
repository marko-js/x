import { pushContext as _pushContext, dynamicTag as _dynamicTag, popContext as _popContext, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";

const _renderer = input => {
  _pushContext("packages/translator/src/__tests__/fixtures/context-tag-from-tag-name/components/other.marko", "Hello");

  _dynamicTag(input.renderBody, null);

  _popContext();

  const _scope = _nextScopeId();
};

export default _renderer;
export const render = _createRenderer(_renderer);