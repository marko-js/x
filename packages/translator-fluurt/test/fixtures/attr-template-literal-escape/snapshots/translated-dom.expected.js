export default function _renderer(input) {
  _beginEl("div");

  _dynamicAttr("foo", _compute(() => `Hello ${_get(input.name)}`));

  _endEl();
}
import { createRenderer as _createRenderer, register as _register, beginEl as _beginEl, get as _get, compute as _compute, endEl as _endEl } from "fluurt/dom";

const _render = _createRenderer(_register("jfbmIp9A", _renderer));

export { _render as render };
import { dynamicAttr as _dynamicAttr } from "fluurt";