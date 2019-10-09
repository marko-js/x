export default function _renderer(input) {
  _write(`<div a="1" b="2"${_attr("c", input.c)}${_attr("d", input.d())} e="3"${_attr("f", 1 + input.f)}${_attr("g", input.a.b.c + d)}${_attr("h", Math.abc.ok())}></div>`);
}
import { createRenderer as _createRenderer, register as _register, attr as _attr, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("9f1X6CjI", _renderer));

export { _render as render };