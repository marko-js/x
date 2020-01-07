const _marko_template = _t(__filename);

export default _marko_template;
import _test from "./components/test.marko";
import _marko_load_tag from "marko/src/runtime/helpers/load-tag";

const _test_tag = _marko_load_tag(_test);

import _marko_dynamic_tag from "marko/src/runtime/helpers/dynamic-tag";
import _marko_renderer from "marko/src/runtime/components/renderer";
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
import { t as _t } from "marko/src/runtime/dom";
import { r as _marko_registerComponent } from "marko/runtime/components/registry-browser";

const _marko_componentType = _marko_registerComponent("VpDF2ft6", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  if (!x) out.be("div", null, "0", component, null, 0);
  out.t("Hello");
  if (!x) out.ee();

  const _test_tag_renderBody = out => {
    out.be("div", null, "2", component, null, 0);
    out.t("Hello");
    out.ee();
  };

  if (x) _marko_dynamic_tag(out, _test_tag_renderBody, null, null, null, null, _component, "3");else _test_tag({
    "renderBody": _test_tag_renderBody
  }, out, _component, "1");

  _marko_dynamic_tag(out, test, null, out => {
    out.be("div", null, "5", component, null, 0);
    out.t("Hello World");
    out.ee();
  }, null, null, _component, "4");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/test.marko"]
};