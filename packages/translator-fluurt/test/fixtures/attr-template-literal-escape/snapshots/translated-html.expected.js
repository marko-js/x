export default function _renderer(input) {
  _write(`<div${_attr("foo", `Hello ${input.name}`)}></div>`);
}
import { createRenderer as _createRenderer, register as _register, attr as _attr, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("jfbmIp9A", _renderer));

export { _render as render };