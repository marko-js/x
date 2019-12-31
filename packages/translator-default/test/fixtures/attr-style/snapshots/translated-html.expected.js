const _marko_template = _t(__filename);

export default _marko_template;
import _marko_style_merge from "marko/src/runtime/helpers/style-value";
import { marko_attr as _marko_attr } from "marko/src/runtime/html/helpers/attr";
import _customTag from "./components/custom-tag.marko";
import _marko_load_tag from "marko/src/runtime/helpers/load-tag";

const _customTag_tag = _marko_load_tag(_customTag);

import { marko_dynamic_tag as _marko_dynamic_tag } from "marko/src/runtime/helpers/dynamic-tag";
import _marko_renderer from "marko/src/runtime/components/renderer";
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "VZtwv5da",
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

  _marko_dynamic_tag(out, input.test, () => ({
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
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/custom-tag.marko"]
};