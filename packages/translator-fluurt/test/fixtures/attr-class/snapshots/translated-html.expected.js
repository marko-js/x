export default (input => {
  out.w("<div class=\"a b c\">");
  out.w("</div>");
  out.w(`<div${_marko_attr("class", _classAttr(["a", input.x]))}>`);
  out.w("</div>");
  out.w(`<div${_marko_attr("class", _classAttr(["a", {
    b: c,
    d
  }]))}>`);
  out.w("</div>");

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
import { classAttr as _classAttr } from "fluurt";
import { a as _marko_attr } from "marko/src/runtime/html/helpers";
import _customTag_tag from "./components/custom-tag.marko";