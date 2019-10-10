export default function _renderer(input) {
  _write("<svg height=\"100\" width=\"100\"><circle cx=\"50\" cy=\"50\" r=\"40\" stroke=\"black\" stroke-width=\"3\" fill=\"red\"><a></a><style>div { color: green }</style><script>alert(\"Hello\");</script><title>Test</title></svg><a></a>");
}
import { createRenderer as _createRenderer, register as _register, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("Y4H-cRmu", _renderer));

export { _render as render };