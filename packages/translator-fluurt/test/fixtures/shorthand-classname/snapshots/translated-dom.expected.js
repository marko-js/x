export default (input => {
  _beginEl("div");

  _attr("class", "shorthand");

  _endEl();

  _beginEl("div");

  _attr("class", "shorthand1 shorthand2");

  _endEl();

  _beginEl("div");

  _attr("class", "shorthand1 shorthand2 inline");

  _endEl();

  _beginEl("div");

  _attr("class", _classAttr(["shorthand1 shorthand2", dynamic1]));

  _endEl();

  _beginEl("div");

  _attr("class", _classAttr([dynamic1, "inline"]));

  _endEl();

  _beginEl("div");

  _attr("class", _classAttr([dynamic1, "shorthand2", "inline"]));

  _endEl();

  _beginEl("div");

  _attr("class", _classAttr([dynamic1, "shorthand2", dynamic2]));

  _endEl();

  _beginEl("div");

  _attr("class", _classAttr([dynamic2, dynamic3, dynamic1, "shorthand2"]));

  _endEl();

  _beginEl("div");

  _attr("class", _classAttr([dynamic1, dynamic2, "shorthand"]));

  _endEl();

  _beginEl("div");

  _attr("class", _classAttr(["partially-" + dynamic1, "shorthand2", dynamic2]));

  _endEl();
});
import { beginEl as _beginEl, attr as _attr, endEl as _endEl, classAttr as _classAttr } from "fluurt";