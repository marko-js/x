import { escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  const MyTag = input => _write(`Hello <!>${_escapeXML(input.name)}${_markHydrateNode(_scope1_id, "#text/0")}`);
  MyTag({
    name: "World",
    renderBody() {
      const _scope2_id = _nextScopeId();
    }
  });
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);