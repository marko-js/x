export default (input => {
  _beginEl("div");

  _attr("id", "shorthand");

  _endEl();

  _beginEl("div");

  _dynamicAttr("id", dynamic);

  _endEl();

  _beginEl("div");

  _attr("id", "partial-" + dynamic);

  _endEl();
});
import { beginEl as _beginEl, attr as _attr, endEl as _endEl, dynamicAttr as _dynamicAttr } from "fluurt";