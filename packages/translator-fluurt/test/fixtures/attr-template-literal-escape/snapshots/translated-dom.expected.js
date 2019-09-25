export default (input => {
  _beginEl("div");

  _dynamicAttr("foo", _compute(() => `Hello ${_get(input.name)}`));

  _endEl();
});
import { beginEl as _beginEl, get as _get, compute as _compute, dynamicAttr as _dynamicAttr, endEl as _endEl } from "fluurt";