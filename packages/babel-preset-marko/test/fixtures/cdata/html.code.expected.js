import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";

const _marko_template = _t(__filename),
      _marko_componentType = "BJ1seX45";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.w("<div>Here is a CDATA section:<![CDATA[ < > & ]]>with all kinds of unescaped text.</div>")
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType
}
export default _marko_template;