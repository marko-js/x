export default function _renderer(input) {
  _beginEl("div");

  _attr("a", 1);

  _attr("b", "2");

  _dynamicAttr("c", input.c);

  _dynamicAttr("d", _compute(() => _get(input.d)()));

  _attr("e", 1 + 2);

  _dynamicAttr("f", _compute(() => 1 + _get(input.f)));

  _dynamicAttr("g", _compute(() => _get(_get(_get(input.a).b).c) + d));

  _attr("h", Math.abc.ok());

  _endEl();
}
import { createRenderer as _createRenderer, register as _register, beginEl as _beginEl, get as _get, compute as _compute, endEl as _endEl } from "fluurt/dom";

const _render = _createRenderer(_register("9f1X6CjI", _renderer));

export { _render as render };
import { attr as _attr, dynamicAttr as _dynamicAttr } from "fluurt";