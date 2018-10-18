import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { a as _marko_attr } from "marko/src/runtime/html/helpers";

const _marko_template = _t(__filename),
      _marko_componentType = "JtF1SNRx";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.w(`<input${_marko_attr("value", input.defaultValue)}${_marko_attr("data-marko", {
    noupdate: ["value"]
  })}>`)
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType
}
export default _marko_template;