export default function _renderer(input) {
  const x = 1;

  _write("<div>");

  {
    const y = 2;

    _write("<button></button>");
  }

  _write("</div>");
}
import { createRenderer as _createRenderer, register as _register, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("wNgFehEa", _renderer));

export { _render as render };