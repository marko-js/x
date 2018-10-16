import { t as _t } from "marko/src/vdom";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";

const _marko_template = _t(__filename),
      _marko_componentType = "1S4Zpnr4";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.be("html", null, "0", component, 0, 0)
  out.be("head", null, "1", component, 0, 0)
  out.be("title", null, "2", component, 0, 0)
  out.t("Title of the document")
  out.ee()
  out.ee()
  out.be("body", null, "3", component, 0, 0)
  out.t("The content of the document......")
  out.ee()
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