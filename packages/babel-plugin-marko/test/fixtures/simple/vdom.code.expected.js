import { t as _t } from "marko/src/runtime/vdom";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";

const _marko_template = _t(__filename),
      _marko_componentType = "hXm4QTQF";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.t("Hello")
  out.t(input.name)
  out.t("!")

  if (input.colors.length) {
    out.be("ul", null, "1", component, 0, 0);

    for (const color of input.colors) {
      out.be("li", null, "3", component, 0, 0);
      out.t(color);
      out.ee();
    }

    out.ee();
  } else {
    out.be("div", null, "5", component, 0, 0);
    out.t("No colors!");
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