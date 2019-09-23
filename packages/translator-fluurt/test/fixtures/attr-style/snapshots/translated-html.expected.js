export default (input => {
  out.w(`<div${_marko_attr("style", _styleAttr({
    color: "green"
  }))}>`);
  out.w("</div>");
  out.w("<div style=\"color: green\">");
  out.w("</div>");

  _customTag_tag({
    "style": {
      color: "green"
    }
  });

  _dynamicTag(_compute(() => input.test), {
    "style": {
      color: "green"
    }
  }, () => {});
});
import _styleAttr, { dynamicTag as _dynamicTag, compute as _compute } from "fluurt";
import { a as _marko_attr } from "marko/src/runtime/html/helpers";
import _customTag_tag from "./components/custom-tag.marko";