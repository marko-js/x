import _marko_style_merge from "marko/src/runtime/vdom/helper-styleAttr";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _marko_template = _t(__filename),
      _marko_componentType = "Q4DAGn8u";

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.be("div", {
    "style": _marko_style_merge({
      color: "green"
    })
  }, "0", component, 0, 4)
  out.ee()
  out.be("div", {
    "style": "color: green"
  }, "1", component, 0, 4)
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