export default function _renderer(input) {
  _beginEl("div");

  _attr("d", 0);

  _attr("y", 1);

  _endEl();
}
import { createRenderer as _createRenderer, register as _register, beginEl as _beginEl, endEl as _endEl } from "fluurt/dom";

const _render = _createRenderer(_register("4pO2n3I0", _renderer));

export { _render as render };
import { attr as _attr } from "fluurt";