export default function _renderer(input) {
  _text("Hello ");

  _dynamicText(input.name);

  _text("! ");

  const _ifBranch = () => {
    _beginEl("ul");

    _loopOf(input.colors, color => {
      _beginEl("li");

      _dynamicText(color);

      _endEl();
    });

    _endEl();
  };

  const _ifBranch2 = () => {
    _beginEl("div");

    _text("No colors!");

    _endEl();
  };

  _conditional(_compute(() => _get(_get(input.colors).length) ? _ifBranch : _ifBranch2));
}
import { createRenderer as _createRenderer, register as _register, text as _text, dynamicText as _dynamicText, beginEl as _beginEl, endEl as _endEl, loopOf as _loopOf, conditional as _conditional, get as _get, compute as _compute } from "fluurt/dom";

const _render = _createRenderer(_register("YyUU9lze", _renderer));

export { _render as render };