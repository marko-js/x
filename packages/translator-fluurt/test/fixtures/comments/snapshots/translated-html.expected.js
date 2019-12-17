export default function _renderer(input) {
  _write("<div><!--abc--><!--[if lt IE 9]><script src=\"...\"></script><![endif]--><!--[if lt IE 9]><script src=\"...\"></script><![endif]--></div>");
}
import { createRenderer as _createRenderer, register as _register, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("rKM3Vw5A", _renderer));

export { _render as render };