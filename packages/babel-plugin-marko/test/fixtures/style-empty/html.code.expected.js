import { t as _t } from "marko/src/runtime/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";

const _marko_template = _t(__filename),
      _marko_componentType = "HSN2-ZNF";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.w("<div class=\"test\"></div>")
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  deps: [{
    "type": "less",
    "code": "",
    "path": "./template.marko",
    "virtualPath": "./template.marko.less"
  }]
}
export default _marko_template;