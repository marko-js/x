const _marko_template = _t(__filename);

export default _marko_template;
import _marko_renderer from "marko/src/runtime/components/renderer";
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
import { t as _t } from "marko/src/runtime/dom";
import { r as _marko_registerComponent } from "marko/runtime/components/registry-browser";

const _marko_componentType = _marko_registerComponent("AXfGRiJb", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  let i = 0;

  while (i < 10) {
    i++;
    out.be("div", null, "1", component, 0, 0);
    out.ee();
  }
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType
};