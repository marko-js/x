export default (input => {
  _beginEl("div");

  _attr("style", "color: green");

  _endEl();

  _beginEl("div");

  _attr("style", _styleAttr({
    color: "green"
  }));

  _endEl();

  _beginEl("div");

  _dynamicAttr("style", _compute(() => _styleAttr({
    color: "green",
    background: _get(input.background)
  })));

  _endEl();

  _customTag_tag({
    "style": "color: green"
  });

  _customTag_tag({
    "style": {
      color: "green"
    }
  });

  _customTag_tag({
    "style": {
      color: "green",
      background: input.background
    }
  });

  _dynamicTag(input.test, {
    "style": "color: green"
  });

  _dynamicTag(input.test, {
    "style": {
      color: "green"
    }
  });

  _dynamicTag(input.test, {
    "style": {
      color: "green",
      background: input.background
    }
  });
});
import { beginEl as _beginEl, attr as _attr, endEl as _endEl, _styleAttr, get as _get, compute as _compute, dynamicAttr as _dynamicAttr, dynamicTag as _dynamicTag } from "fluurt";
import _customTag_tag from "./components/custom-tag.marko";