export default (input => {
  _customTag_tag({
    renderBody: (a, b, {
      c
    }) => {
      _beginEl("div");

      _dynamicText(a);

      _text(" ");

      _dynamicText(b);

      _text(" ");

      _dynamicText(_compute(() => _get(c) + _get(input.d)));

      _endEl();
    }
  });
});
import { dynamicText as _dynamicText, text as _text, get as _get, compute as _compute, beginEl as _beginEl, endEl as _endEl } from "fluurt";
import _customTag_tag from "./components/custom-tag.marko";