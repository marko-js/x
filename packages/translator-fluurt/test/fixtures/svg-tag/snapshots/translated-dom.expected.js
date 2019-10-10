export default function _renderer(input) {
  _beginElNS("svg");

  _attr("height", "100");

  _attr("width", "100");

  _beginEl("circle");

  _attr("cx", "50");

  _attr("cy", "50");

  _attr("r", "40");

  _attr("stroke", "black");

  _attr("stroke-width", "3");

  _attr("fill", "red");

  _endEl();

  _beginEl("a");

  _endEl();

  _beginEl("style");

  _text("div { color: green }");

  _endEl();

  _beginEl("script");

  _text("alert(\"Hello\");");

  _endEl();

  _beginEl("title");

  _text("Test");

  _endEl();

  _endEl();

  _endNS();

  _beginEl("a");

  _endEl();
}
import { createRenderer as _createRenderer, register as _register, beginEl as _beginEl, endEl as _endEl, text as _text, beginElNS as _beginElNS, endNS as _endNS } from "fluurt/dom";

const _render = _createRenderer(_register("Y4H-cRmu", _renderer));

export { _render as render };
import { attr as _attr } from "fluurt";