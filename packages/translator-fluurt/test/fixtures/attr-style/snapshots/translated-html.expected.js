export default (input => {
  _write(`<div style="color: green"></div><div${_attr("style", _styleAttr({
    color: "green"
  }))}></div><div${_attr("style", _styleAttr({
    color: "green",
    background: input.background
  }))}></div>`);

  _customTag_tag({
    "style": "color: green"
  });

  _customTag_tag({
    "style": {
      color: "green"
    }
  });

  _customTag_tag({
    "style": {
      color: "green",
      background: input.background
    }
  });

  _dynamicTag(input.test, {
    "style": "color: green"
  });

  _dynamicTag(input.test, {
    "style": {
      color: "green"
    }
  });

  _dynamicTag(input.test, {
    "style": {
      color: "green",
      background: input.background
    }
  });
});
import { write as _write, attr as _attr } from "fluurt/html";
import _styleAttr, { dynamicTag as _dynamicTag } from "fluurt";
import _customTag_tag from "./components/custom-tag.marko";