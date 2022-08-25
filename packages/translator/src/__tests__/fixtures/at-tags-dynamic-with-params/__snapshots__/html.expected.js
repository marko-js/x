import { markHydrateNode as _markHydrateNode, write as _write, escapeXML as _escapeXML, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
import _hello from "./components/hello/index.marko";

const _renderer = ({
  x
}) => {
  const _scope = _nextScopeId();

  let _item;

  const _scope = _nextScopeId();

  _write(`${_markHydrateNode(_scope, 0)}`);

  if (x) {
    const _scope = _nextScopeId();

    _item = {
      renderBody(y) {
        _write(`${_markHydrateNode(_scope, 0)}${_escapeXML(y)}`);
      }

    };
  }

  _hello({
    item: _item
  });
};

export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);