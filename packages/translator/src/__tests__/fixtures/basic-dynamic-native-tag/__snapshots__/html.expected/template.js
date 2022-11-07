import { markHydrateNode as _markHydrateNode, write as _write, dynamicTag as _dynamicTag, nextScopeId as _nextScopeId, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";

const _renderer = ({
  tagName
}) => {
  const _scope = _nextScopeId();

  _write(`${_markHydrateNode(_scope, 0)}`);

  _dynamicTag(tagName, {
    class: ["a", "b"]
  }, () => _write("Hello World"));
};

export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);