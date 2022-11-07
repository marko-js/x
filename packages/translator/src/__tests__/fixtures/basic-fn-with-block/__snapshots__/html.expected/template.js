import { markHydrateNode as _markHydrateNode, escapeXML as _escapeXML, write as _write, nextScopeId as _nextScopeId, writeHydrateCall as _writeHydrateCall, writeHydrateScope as _writeHydrateScope, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";

const _renderer = input => {
  const _scope = _nextScopeId();

  const count = 0;

  _write(`${_markHydrateNode(_scope, 0)}<button>${_markHydrateNode(_scope, 1)}${_escapeXML(count)}</button>`);

  _writeHydrateCall(_scope, "packages/translator/src/__tests__/fixtures/basic-fn-with-block/template.marko_0_count");

  _writeHydrateScope(_scope, {
    2: count
  });
};

export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);