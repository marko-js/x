export default (input => {
  _beginEl("div");

  _attr("class", "test");

  _endEl();
});
import { beginEl as _beginEl, attr as _attr, endEl as _endEl } from "fluurt";