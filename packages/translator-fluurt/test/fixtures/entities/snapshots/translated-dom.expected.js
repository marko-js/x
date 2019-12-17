export default function _renderer(input) {
  _text("Hello John & Suzy Invalid Entity: &b ; Valid Numeric Entity: \" Valid Hexadecimal Entity: \xA2");
}
import { createRenderer as _createRenderer, register as _register, text as _text } from "fluurt/dom";

const _render = _createRenderer(_register("8TXuSKuu", _renderer));

export { _render as render };