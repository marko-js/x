export default (input => {
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
});
import { beginEl as _beginEl, attr as _attr, dynamicAttr as _dynamicAttr, get as _get, compute as _compute, endEl as _endEl } from "fluurt";