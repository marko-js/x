import "./foo";
import { b as c } from "./bar";
import baz from "./components/baz.marko";
import { nextScopeId as _nextScopeId, escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  baz({
    renderBody() {
      const _scope1_id = _nextScopeId();
    }
  });
  _write(`${_escapeXML(c)}${_markHydrateNode(_scope0_id, "#text/0")}`);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);