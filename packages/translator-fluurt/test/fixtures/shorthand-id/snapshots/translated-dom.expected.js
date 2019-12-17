export default function _renderer(input) {
  _beginEl("div");

  _attr("id", "shorthand");

  _endEl();

  _beginEl("div");

  _dynamicAttr("id", dynamic);

  _endEl();

  _beginEl("div");

  _attr("id", "partial-" + dynamic);

  _endEl();
}
import { createRenderer as _createRenderer, register as _register, beginEl as _beginEl, endEl as _endEl } from "fluurt/dom";

const _render = _createRenderer(_register("9c6E5DWN", _renderer));

export { _render as render };
import { attr as _attr, dynamicAttr as _dynamicAttr } from "fluurt";