export default function _renderer(input) {
  _write("<!--test-->");
}
import { createRenderer as _createRenderer, register as _register, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("bDzkgNFI", _renderer));

export { _render as render };