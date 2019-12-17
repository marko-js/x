export default function _renderer(input) {
  _write(`Hello ${_xml(input.name)}! `);

  if (input.colors.length) {
    _write("<ul>");

    for (const color of input.colors) {
      _write(`<li>${_xml(color)}</li>`);
    }

    _write("</ul>");
  } else {
    _write("<div>No colors!</div>");
  }
}
import { createRenderer as _createRenderer, register as _register, write as _write, xml as _xml } from "fluurt/html";

const _render = _createRenderer(_register("YyUU9lze", _renderer));

export { _render as render };