import "./foo";
import { b as c } from "./bar";
import baz from "./components/baz.marko";
import { nextScopeId as _nextScopeId, markHydrateNode as _markHydrateNode, escapeXML as _escapeXML, write as _write, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";

const _renderer = input => {
  baz({
    renderBody() {
      const _scope = _nextScopeId();
    }

  });

  _write(`${_markHydrateNode(0)}${_escapeXML(c)}`);

  const _scope = _nextScopeId();
};

export default _renderer;
export const render = _createRenderer(_renderer);