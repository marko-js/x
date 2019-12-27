const _marko_template = _t2(__filename);

export default _marko_template;
import _test from "./components/test.marko";
import { t as _t, d as _marko_dynamicTag } from "marko/src/runtime/html/helpers";

const _test_tag = _t(_test);

import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t2 } from "marko/src/runtime/html";

const _marko_componentType = _marko_registerComponent("VpDF2ft6", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  if (!x) out.w("<div>");
  out.w("Hello");
  if (!x) out.w("</div>");

  const _test_tag_renderBody = out => {
    out.w("<div>Hello</div>");
  };

  if (x) _marko_dynamicTag(out, _test_tag_renderBody, null, null, null, null, _component, "3");else _test_tag({
    "renderBody": _test_tag_renderBody
  }, out, _component, "1");

  _marko_dynamicTag(out, test, null, out => {
    out.w("<div>Hello World</div>");
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