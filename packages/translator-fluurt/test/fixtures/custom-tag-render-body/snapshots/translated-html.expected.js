export default function _renderer(input) {
  _testBodyFunction_tag({
    "name": "World",

    renderBody() {
      _write("This is the body content");
    }

  });
}
import { createRenderer as _createRenderer, register as _register, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("SWWITW9h", _renderer));

export { _render as render };
import _testBodyFunction_tag from "./components/test-body-function/index.marko";