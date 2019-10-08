export default (input => {
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
});
import { write as _write, attr as _attr } from "fluurt/html";
import { classAttr as _classAttr } from "fluurt";
import _customTag_tag from "./components/custom-tag.marko";