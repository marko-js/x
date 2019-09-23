export default (input => {
  _beginEl("div")

  _dynamicAttr("style", _compute(() => _styleAttr({
    color: "green"
  })))

  _endEl()

  _beginEl("div")

  _attr("style", "color: green")

  _endEl()

  _customTag_tag({
    "style": {
      color: "green"
    }
  });

  _dynamicTag(_compute(() => input.test), {
    "style": {
      color: "green"
    }
  }, () => {});
});
import _styleAttr, { beginEl as _beginEl, dynamicAttr as _dynamicAttr, compute as _compute, endEl as _endEl, attr as _attr, dynamicTag as _dynamicTag } from "fluurt";
import _customTag_tag from "./components/custom-tag.marko";