const _marko_template = _t2(__filename);

export default _marko_template;
import _testBodyFunction from "./tags/test-body-function/renderer.js";
import { t as _t } from "marko/src/runtime/vdom/helpers";

const _testBodyFunction_tag = _t(_testBodyFunction);

import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_componentType = _marko_registerComponent("2EFrUtzo", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  _testBodyFunction_tag({
    "name": "World",
    "renderBody": out => {
      out.t("This is the body content");
    }
  }, out, _component, "0");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./tags/test-body-function/renderer.js"]
};