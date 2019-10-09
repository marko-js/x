export default function _renderer(input) {
  _write(`<div class="shorthand"></div><div class="shorthand1 shorthand2"></div><div class="shorthand1 shorthand2 inline"></div><div${_attr("class", _classAttr(["shorthand1 shorthand2", dynamic1]))}></div><div${_attr("class", _classAttr([dynamic1, "inline"]))}></div><div${_attr("class", _classAttr([dynamic1, "shorthand2", "inline"]))}></div><div${_attr("class", _classAttr([dynamic1, "shorthand2", dynamic2]))}></div><div${_attr("class", _classAttr([dynamic2, dynamic3, dynamic1, "shorthand2"]))}></div><div${_attr("class", _classAttr([dynamic1, dynamic2, "shorthand"]))}></div><div${_attr("class", _classAttr(["partially-" + dynamic1, "shorthand2", dynamic2]))}></div>`);
}
import { createRenderer as _createRenderer, register as _register, write as _write, classAttr as _classAttr, attr as _attr } from "fluurt/html";

const _render = _createRenderer(_register("scCJKZPx", _renderer));

export { _render as render };