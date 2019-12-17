export default function _renderer(input) {
  _beginEl("div");

  _text("<div>");

  _endEl();
}
import { createRenderer as _createRenderer, register as _register, text as _text, beginEl as _beginEl, endEl as _endEl } from "fluurt/dom";

const _render = _createRenderer(_register("rCMhcWfE", _renderer));

export { _render as render };