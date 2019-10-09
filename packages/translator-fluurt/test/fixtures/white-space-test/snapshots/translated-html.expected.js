export default function _renderer(input) {
  _write(`<div><div>Hello <div> </div> World</div><div> Hello</div><pre>\n    This should  \n      be preserved\n  </pre><div><div>Hello </div></div></div><div>Hello World </div> Hello World! ${_xml(a)}${_xml(b)}<div></div>`);
}
import { createRenderer as _createRenderer, register as _register, write as _write, xml as _xml } from "fluurt/html";

const _render = _createRenderer(_register("ic4rRpG7", _renderer));

export { _render as render };