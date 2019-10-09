export default function _renderer(input) {
  _write(`<div id="shorthand"></div><div${_attr("id", dynamic)}></div><div${_attr("id", "partial-" + dynamic)}></div>`);
}
import { createRenderer as _createRenderer, register as _register, write as _write, attr as _attr } from "fluurt/html";

const _render = _createRenderer(_register("9c6E5DWN", _renderer));

export { _render as render };