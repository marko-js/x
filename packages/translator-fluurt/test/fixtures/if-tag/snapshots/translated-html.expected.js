export default function _renderer(input) {
  if (a + b) {
    _write("Hello");
  }

  if (a, b) {
    _write("World");
  }

  _write("<div>");

  if (x) {
    _write("A");
  } else if (y) {
    _write("B");
  } else {
    _write("C");
  }

  _write("</div>");

  if (input.x) {
    _write("Hi Again");
  }
}
import { createRenderer as _createRenderer, register as _register, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("DuNpP0vj", _renderer));

export { _render as render };