export default function _renderer(input) {
  _write("Hello John");
}
import { createRenderer as _createRenderer, register as _register, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("AsF6UF1W", _renderer));

export { _render as render };