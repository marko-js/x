import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import _marko_component from "./template.component.js";

const _marko_template = _t(__filename),
      _marko_componentType = "wsWChziA";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.be("div", null, "0", component, 0, 0)
  out.ee()
}, {
  ___type: _marko_componentType,
  ___split: true
})
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  component: "./template.component-browser.js"
}
export default _marko_template;