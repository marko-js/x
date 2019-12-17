export default function _renderer(input) {
  _beginEl("html");

  _beginEl("head");

  _beginEl("title");

  _text("Title of the document");

  _endEl();

  _endEl();

  _beginEl("body");

  _text("The content of the document......");

  _endEl();

  _endEl();
}
import { createRenderer as _createRenderer, register as _register, text as _text, beginEl as _beginEl, endEl as _endEl } from "fluurt/dom";

const _render = _createRenderer(_register("NKOqave-", _renderer));

export { _render as render };