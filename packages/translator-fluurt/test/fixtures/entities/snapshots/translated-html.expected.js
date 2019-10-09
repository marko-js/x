export default function _renderer(input) {
  _write("Hello John &amp; Suzy Invalid Entity: &b ; Valid Numeric Entity: &#34; Valid Hexadecimal Entity: &#x00A2;");
}
import { createRenderer as _createRenderer, register as _register, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("8TXuSKuu", _renderer));

export { _render as render };