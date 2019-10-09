export default function _renderer(input) {
  _write(`Hello ${_xml(input.name)}! Hello ${input.name}! Hello ${input.missing}!`);
}
import { createRenderer as _createRenderer, register as _register, write as _write, xml as _xml } from "fluurt/html";

const _render = _createRenderer(_register("cfkKqsa-", _renderer));

export { _render as render };