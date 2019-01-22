import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _marko_template = _t(__filename),
      _marko_componentType = "7_cIMGIq";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  let i = 0;

  while (i < 10) {
    i++;
    out.be("div", {}, "1", component, 0, 0);
    out.ee();
  }
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType
}
export default _marko_template;