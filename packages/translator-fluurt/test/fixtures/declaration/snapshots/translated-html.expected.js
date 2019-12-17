export default function _renderer(input) {
  _write("<?xml version=\"1.0\" encoding=\"utf-8\"?><contact-info><name>Hello World</name></contact-info>");
}
import { createRenderer as _createRenderer, register as _register, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("wR3FDzrT", _renderer));

export { _render as render };