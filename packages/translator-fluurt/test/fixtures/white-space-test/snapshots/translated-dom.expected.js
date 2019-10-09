export default function _renderer(input) {
  _beginEl("div");

  _beginEl("div");

  _text("Hello ");

  _beginEl("div");

  _text(" ");

  _endEl();

  _text(" World");

  _endEl();

  _beginEl("div");

  _text(" Hello");

  _endEl();

  _beginEl("pre");

  _text("\n    This should  \n      be preserved\n  ");

  _endEl();

  _beginEl("div");

  _beginEl("div");

  _text("Hello ");

  _endEl();

  _endEl();

  _endEl();

  _beginEl("div");

  _text("Hello ");

  _text("World ");

  _endEl();

  _text(" Hello World! ");

  _dynamicText(a);

  _dynamicText(b);

  _beginEl("div");

  _endEl();
}
import { createRenderer as _createRenderer, register as _register, text as _text, beginEl as _beginEl, endEl as _endEl, dynamicText as _dynamicText } from "fluurt/dom";

const _render = _createRenderer(_register("ic4rRpG7", _renderer));

export { _render as render };