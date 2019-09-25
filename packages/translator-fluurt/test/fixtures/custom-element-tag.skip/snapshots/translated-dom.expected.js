const _marko_template = _t(__filename);

export default _marko_template;
import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t } from "marko/src/runtime/dom";

const _marko_componentType = _marko_registerComponent("fbD4OyG-", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.be("hello", null, "0", component, 0, 4);
  out.ee();
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  deps: ["./components/hello/init.js"]
};