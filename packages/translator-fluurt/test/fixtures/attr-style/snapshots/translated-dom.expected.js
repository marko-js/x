export default function _renderer(input) {
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
}
import { createRenderer as _createRenderer, register as _register, beginEl as _beginEl, endEl as _endEl, get as _get, compute as _compute, dynamicTag as _dynamicTag } from "fluurt/dom";

const _render = _createRenderer(_register("GctoYUnu", _renderer));

export { _render as render };
import { attr as _attr, _styleAttr, dynamicAttr as _dynamicAttr } from "fluurt";
import _customTag_tag from "./components/custom-tag.marko";