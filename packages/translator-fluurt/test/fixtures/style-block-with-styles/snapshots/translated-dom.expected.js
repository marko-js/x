export default function _renderer(input) {
  _beginEl("div");

  _attr("class", "test");

  _endEl();
}
import { createRenderer as _createRenderer, register as _register, beginEl as _beginEl, endEl as _endEl } from "fluurt/dom";

const _render = _createRenderer(_register("SybjbS5y", _renderer));

export { _render as render };
import { attr as _attr } from "fluurt";