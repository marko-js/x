const _marko_template = _t2(__filename);

export default _marko_template;
import _test from "./test.marko";
import { t as _t } from "marko/src/runtime/dom/helpers";

const _test_tag = _t(_test);

import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t2 } from "marko/src/runtime/dom";

const _marko_componentType = _marko_registerComponent("PXhaeWTf", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  _test_tag({
    "class": input.class,
    "renderBody": (out, data) => {
      out.t("Hello ");
      out.t(data.name);
    }
  }, out, _component, "0");

  out.be("div", null, "1", component, null, 0);
  out.t("Hello ");
  out.t(input.name);
  out.be("span", null, "2", component, null, 0);

  () => {
    data;
    const data = "foo";
    console.log(data);
  };

  out.t("Hello ");
  out.t(input);
  out.ee();

  if (true) {
    const data = "bar";
    out.t("Hello ");
    out.t(data);
  }

  out.ee();
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./test.marko"]
};