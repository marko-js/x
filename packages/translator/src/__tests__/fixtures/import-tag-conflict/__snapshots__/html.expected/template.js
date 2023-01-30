import { asset as asset1 } from "./asset1";
import { asset as asset2 } from "./asset2";
import { escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, write as _write, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = (input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  _write(`${_escapeXML(asset1)}${_markHydrateNode(_scope0_id, "#text/0")} <!>${_escapeXML(asset2)}${_markHydrateNode(_scope0_id, "#text/1")}`);
};
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);