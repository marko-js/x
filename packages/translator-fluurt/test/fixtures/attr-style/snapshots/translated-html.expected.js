export default function _renderer(input) {
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
}
import { createRenderer as _createRenderer, register as _register, write as _write, attr as _attr, dynamicTag as _dynamicTag } from "fluurt/html";

const _render = _createRenderer(_register("GctoYUnu", _renderer));

export { _render as render };
import _styleAttr from "fluurt";
import _customTag_tag from "./components/custom-tag.marko";