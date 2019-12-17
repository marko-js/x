export default function _renderer(input) {
  _write("<!DOCTYPE html><html><head><title>Title of the document</title></head><body>The content of the document......</body></html>");
}
import { createRenderer as _createRenderer, register as _register, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("NKOqave-", _renderer));

export { _render as render };