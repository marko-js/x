import _marko_component from "./template.component.js";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _marko_template = _t(__filename),
      _marko_componentType = "0hrcFohB";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.be("div", {}, "0", component, 0, 0)
  out.ee()
}, {
  ___type: _marko_componentType
})
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  component: "./template.component.js"
}
export default _marko_template;