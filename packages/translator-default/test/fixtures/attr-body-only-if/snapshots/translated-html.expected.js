const _marko_template = _t(__filename);

export default _marko_template;
import _test from "./components/test.marko";
import _marko_load_tag from "marko/src/runtime/helpers/load-tag";

const _test_tag = _marko_load_tag(_test);

import { marko_dynamic_tag as _marko_dynamic_tag } from "marko/src/runtime/helpers/dynamic-tag";
import _marko_renderer from "marko/src/runtime/components/renderer";
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "VpDF2ft6",
      _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  if (!x) out.w("<div>");
  out.w("Hello");
  if (!x) out.w("</div>");

  const _test_tag_renderBody = out => {
    out.w("<div>Hello</div>");
  };

  if (x) _marko_dynamic_tag(out, _test_tag_renderBody, null, null, null, null, _component, "3");else _test_tag({
    "renderBody": _test_tag_renderBody
  }, out, _component, "1");

  _marko_dynamic_tag(out, test, null, out => {
    out.w("<div>Hello World</div>");
  }, null, null, _component, "4");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/test.marko"]
};