export default function _renderer(input) {
  _write("<div class=\"test\"></div>");
}
import { createRenderer as _createRenderer, register as _register, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("SybjbS5y", _renderer));

export { _render as render };