import { t as _t } from "marko/src/vdom";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";

const _marko_template = _t(__filename),
      _marko_componentType = "dqlPhY8O";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.t("Hello")
  out.t(input.name)
  out.t("! Hello")
  out.h(input.name)
  out.t("! Hello")
  out.h(input.missing)
  out.t("!")
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType
}
export default _marko_template;