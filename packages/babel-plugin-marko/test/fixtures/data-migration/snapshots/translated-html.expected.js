const _marko_template = _t2(__filename);

export default _marko_template;
import { x as _marko_escapeXml, t as _t } from "marko/src/runtime/html/helpers";
import _test from "./test.marko";

const _test_tag = _t(_test);

import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t2 } from "marko/src/runtime/html";

const _marko_componentType = _marko_registerComponent("xjEfjSzA", () => _marko_template),
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
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./test.marko"]
};