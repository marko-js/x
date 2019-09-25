export default (input => {
  out.w("<div style=\"color: green\">");
  out.w("</div>");
  out.w(`<div${_marko_attr("style", _styleAttr({
    color: "green"
  }))}>`);
  out.w("</div>");
  out.w(`<div${_marko_attr("style", _styleAttr({
    color: "green",
    background: input.background
  }))}>`);
  out.w("</div>");

  _customTag_tag({
    "style": "color: green"
  });

  _customTag_tag({
    "style": {
      color: "green"
    }
  });

  _customTag_tag({
    "style": _compute(() => ({
      color: "green",
      background: _get(input.background)
    }))
  });

  _dynamicTag(input.test, {
    "style": "color: green"
  }, () => {});

  _dynamicTag(input.test, {
    "style": {
      color: "green"
    }
  }, () => {});

  _dynamicTag(input.test, {
    "style": _compute(() => ({
      color: "green",
      background: _get(input.background)
    }))
  }, () => {});
});
import _styleAttr, { get as _get, compute as _compute, dynamicTag as _dynamicTag } from "fluurt";
import { a as _marko_attr } from "marko/src/runtime/html/helpers";
import _customTag_tag from "./components/custom-tag.marko";