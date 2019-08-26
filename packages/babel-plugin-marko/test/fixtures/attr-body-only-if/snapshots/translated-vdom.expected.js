import _test from "./components/test.marko";
import { t as _t, d as _marko_dynamicTag } from "marko/src/runtime/vdom/helpers";

const _test_tag = _t(_test);

import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_template = _t2(__filename),
      _marko_componentType = _marko_registerComponent("M5ooyXS3", () => _marko_template),
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

  if (x) _marko_dynamicTag(out, _test_tag_renderBody, null, null, null, null, _component, "3");else _test_tag({
    "renderBody": _test_tag_renderBody
  }, out, "1");

  _marko_dynamicTag(out, test, () => ({
    "renderBody": out => {
      out.be("div", null, "5", component, null, 0);
      out.t("Hello World");
      out.ee();
    }
  }), out => {
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
export default _marko_template;