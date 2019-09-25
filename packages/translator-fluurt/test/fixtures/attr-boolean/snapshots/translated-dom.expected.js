export default (input => {
  _beginEl("input")

  _attr("checked", true)

  _endEl()
});
import { beginEl as _beginEl, attr as _attr, endEl as _endEl } from "fluurt";