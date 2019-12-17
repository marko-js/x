export default function _renderer(input) {
  _beginEl("input");

  _attr("checked", true);

  _endEl();
}
import { createRenderer as _createRenderer, register as _register, beginEl as _beginEl, endEl as _endEl } from "fluurt/dom";

const _render = _createRenderer(_register("rM73nsv8", _renderer));

export { _render as render };
import { attr as _attr } from "fluurt";