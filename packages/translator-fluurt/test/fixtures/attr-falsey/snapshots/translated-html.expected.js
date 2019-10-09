export default function _renderer(input) {
  _write("<div c=\"false\" d=\"0\" y=\"1\"></div>");
}
import { createRenderer as _createRenderer, register as _register, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("4pO2n3I0", _renderer));

export { _render as render };