export default function _renderer(input) {
  _customTag_tag({
    renderBody(a, b, {
      c
    }) {
      _beginEl("div");

      _dynamicText(a);

      _text(" ");

      _dynamicText(b);

      _text(" ");

      _dynamicText(_compute(() => _get(c) + _get(input.d)));

      _endEl();
    }

  });
}
import { createRenderer as _createRenderer, register as _register, dynamicText as _dynamicText, text as _text, get as _get, compute as _compute, beginEl as _beginEl, endEl as _endEl } from "fluurt/dom";

const _render = _createRenderer(_register("-GdU8GmU", _renderer));

export { _render as render };
import _customTag_tag from "./components/custom-tag.marko";