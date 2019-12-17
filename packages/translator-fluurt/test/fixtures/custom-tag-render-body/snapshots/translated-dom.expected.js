export default function _renderer(input) {
  _testBodyFunction_tag({
    "name": "World",

    renderBody() {
      _text("This is the body content");
    }

  });
}
import { createRenderer as _createRenderer, register as _register, text as _text } from "fluurt/dom";

const _render = _createRenderer(_register("SWWITW9h", _renderer));

export { _render as render };
import _testBodyFunction_tag from "./components/test-body-function/index.marko";