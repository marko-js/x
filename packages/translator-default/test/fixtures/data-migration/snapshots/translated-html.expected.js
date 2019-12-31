const _marko_template = _t(__filename);

export default _marko_template;
import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers/escape-xml";
import _test from "./test.marko";
import _marko_load_tag from "marko/src/runtime/helpers/load-tag";

const _test_tag = _marko_load_tag(_test);

import _marko_renderer from "marko/src/runtime/components/renderer";
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "PXhaeWTf",
      _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  _test_tag({
    "class": input.class,
    "renderBody": (out, data) => {
      out.w(`Hello ${_marko_escapeXml(data.name)}`);
    }
  }, out, _component, "0");

  out.w(`<div>Hello ${_marko_escapeXml(input.name)}<span>`);

  () => {
    data;
    const data = "foo";
    console.log(data);
  };

  out.w(`Hello ${_marko_escapeXml(input)}</span>`);

  if (true) {
    const data = "bar";
    out.w(`Hello ${_marko_escapeXml(data)}`);
  }

  out.w("</div>");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./test.marko"]
};