const _marko_template = _t2(__filename);

export default _marko_template;
import _marko_style_merge from "marko/src/runtime/vdom/helper-styleAttr";
import { a as _marko_attr, t as _t, d as _marko_dynamicTag } from "marko/src/runtime/html/helpers";
import _customTag from "./components/custom-tag.marko";

const _customTag_tag = _t(_customTag);

import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t2 } from "marko/src/runtime/html";

const _marko_componentType = _marko_registerComponent("VZtwv5da", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.w(`<div${_marko_attr("style", _marko_style_merge({
    color: input.color
  }))}></div><div style="width:100px;"></div><div style="color: green"></div>`);

  _customTag_tag({
    "style": {
      color: input.color
    }
  }, out, _component, "3");

  _customTag_tag({
    "style": {
      width: 100
    }
  }, out, _component, "4");

  _customTag_tag({
    "style": "color: green"
  }, out, _component, "5");

  _marko_dynamicTag(out, input.test, () => ({
    "style": {
      color: "green"
    },
    "test": {
      "style": {
        color: "green"
      },
      "renderBody": out => {
        out.w("Hello");
      }
    }
  }), null, null, null, _component, "6");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/custom-tag.marko"]
};