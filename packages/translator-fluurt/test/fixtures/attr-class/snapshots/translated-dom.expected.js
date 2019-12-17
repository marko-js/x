export default function _renderer(input) {
  _beginEl("div");

  _attr("class", "a b c");

  _endEl();

  _beginEl("div");

  _dynamicAttr("class", _compute(() => _classAttr(["a", _get(input.x)])));

  _endEl();

  _beginEl("div");

  _attr("class", _classAttr(["a", {
    b: c,
    d
  }]));

  _endEl();

  _customTag_tag({
    "class": "a b c"
  });

  _customTag_tag({
    "class": _compute(() => ["a", _get(input.x)])
  });

  _customTag_tag({
    "class": ["a", {
      b: c,
      d
    }]
  });
}
import { createRenderer as _createRenderer, register as _register, beginEl as _beginEl, endEl as _endEl, classAttr as _classAttr, get as _get, compute as _compute } from "fluurt/dom";

const _render = _createRenderer(_register("vGqC839K", _renderer));

export { _render as render };
import { attr as _attr, dynamicAttr as _dynamicAttr } from "fluurt";
import _customTag_tag from "./components/custom-tag.marko";