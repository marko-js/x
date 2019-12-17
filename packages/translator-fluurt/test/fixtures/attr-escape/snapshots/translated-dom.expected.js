export default function _renderer(input) {
  _beginEl("div");

  _dynamicAttr("class", _compute(() => _classAttr(_get(input.className))));

  _dynamicAttr("foo", _compute(() => 'a' + _get(input.foo) + 'b'));

  _dynamicAttr("bar", _compute(() => `a ${_get(input.foo)} b`));

  _endEl();
}
import { createRenderer as _createRenderer, register as _register, classAttr as _classAttr, beginEl as _beginEl, get as _get, compute as _compute, endEl as _endEl } from "fluurt/dom";

const _render = _createRenderer(_register("xYPQqWNu", _renderer));

export { _render as render };
import { dynamicAttr as _dynamicAttr } from "fluurt";