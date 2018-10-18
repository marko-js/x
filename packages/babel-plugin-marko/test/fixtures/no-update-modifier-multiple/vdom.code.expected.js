import { t as _t } from "marko/src/vdom";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import "marko/src/runtime/vdom/preserve-attrs";

const _marko_template = _t(__filename),
      _marko_componentType = "v6sm3nBF";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.be("div", null, "0", component, 0, 0)
  out.e("input", {
    "value": input.defaultValue
  }, "1", component, 0, 0, {
    noupdate: ["value"]
  })
  out.e("input", {
    "type": "checkbox",
    "value": input.defaultValue,
    "checked": input.checked
  }, "2", component, 0, 0, {
    noupdate: ["value", "checked"]
  })
  out.ee()
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType
}
export default _marko_template;