import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";

const _marko_template = _t(__filename),
      _marko_componentType = "/babel-preset-marko$1.0.0/test/fixtures/entities/template.marko";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.t("Hello John &amp; Suzy Invalid Entity: &b ; Valid Numeric Entity: &#34; Valid Hexadecimal Entity: &#x00A2;")
}, {
  ___type: _marko_componentType
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType
}
export default _marko_template;