import { markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, writeHydrateCall as _writeHydrateCall, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const el = () => {
    throw new Error("Cannot reference DOM node from server");
  };
  _write(`<div></div>${_markHydrateNode(_scope0_id, "#div/0")}`);
  _writeHydrateCall(_scope0_id, "packages/translator/src/__tests__/fixtures/native-tag-ref-effect/template.marko_0");
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);