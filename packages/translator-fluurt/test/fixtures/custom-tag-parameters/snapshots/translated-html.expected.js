export default function _renderer(input) {
  _customTag_tag({
    renderBody(a, b, {
      c
    }) {
      _write(`<div>${_xml(a)} ${_xml(b)} ${_xml(c + input.d)}</div>`);
    }

  });
}
import { createRenderer as _createRenderer, register as _register, xml as _xml, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("-GdU8GmU", _renderer));

export { _render as render };
import _customTag_tag from "./components/custom-tag.marko";