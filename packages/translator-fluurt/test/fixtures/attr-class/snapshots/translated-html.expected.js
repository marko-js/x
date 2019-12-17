export default function _renderer(input) {
  _write(`<div class="a b c"></div><div${_attr("class", _classAttr(["a", input.x]))}></div><div${_attr("class", _classAttr(["a", {
    b: c,
    d
  }]))}></div>`);

  _customTag_tag({
    "class": "a b c"
  });

  _customTag_tag({
    "class": ["a", input.x]
  });

  _customTag_tag({
    "class": ["a", {
      b: c,
      d
    }]
  });
}
import { createRenderer as _createRenderer, register as _register, write as _write, classAttr as _classAttr, attr as _attr } from "fluurt/html";

const _render = _createRenderer(_register("vGqC839K", _renderer));

export { _render as render };
import _customTag_tag from "./components/custom-tag.marko";