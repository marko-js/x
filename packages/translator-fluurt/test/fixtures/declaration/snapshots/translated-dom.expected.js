export default function _renderer(input) {
  _beginEl("contact-info");

  _beginEl("name");

  _text("Hello World");

  _endEl();

  _endEl();
}
import { createRenderer as _createRenderer, register as _register, text as _text, beginEl as _beginEl, endEl as _endEl } from "fluurt/dom";

const _render = _createRenderer(_register("wR3FDzrT", _renderer));

export { _render as render };