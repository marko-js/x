export default (input => {
  _beginEl("div");

  _dynamicAttr("class", _compute(() => _classAttr(_get(input.className))));

  _dynamicAttr("foo", _compute(() => 'a' + _get(input.foo) + 'b'));

  _dynamicAttr("bar", _compute(() => `a ${_get(input.foo)} b`));

  _endEl();
});
import { classAttr as _classAttr, beginEl as _beginEl, get as _get, compute as _compute, dynamicAttr as _dynamicAttr, endEl as _endEl } from "fluurt";