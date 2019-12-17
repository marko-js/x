export default function _renderer(input) {
  _testHello_tag({
    "name": "World"
  });

  _testHello_tag({
    "name": Math.random()
  });

  _testHello_tag(input.attrs);
}
import { createRenderer as _createRenderer, register as _register } from "fluurt/html";

const _render = _createRenderer(_register("RQgcUsle", _renderer));

export { _render as render };
import _testHello_tag from "./components/test-hello/index.marko";