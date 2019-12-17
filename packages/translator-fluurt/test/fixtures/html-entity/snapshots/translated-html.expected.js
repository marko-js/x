export default function _renderer(input) {
  _write("<div>&lt;div&gt;</div>");
}
import { createRenderer as _createRenderer, register as _register, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("rCMhcWfE", _renderer));

export { _render as render };