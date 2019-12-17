export default function _renderer(input) {
  _write(`<div${_attr("class", _classAttr(input.className))}${_attr("foo", 'a' + input.foo + 'b')}${_attr("bar", `a ${input.foo} b`)}></div>`);
}
import { createRenderer as _createRenderer, register as _register, classAttr as _classAttr, attr as _attr, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("xYPQqWNu", _renderer));

export { _render as render };