import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _marko_componentType = "lYKPsINJ",
      _marko_template = _t(__filename),
      _marko_component = null;

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  if (a + b) {
    out.t("Hello");
  }

  if (a, b) {
    out.t("World");
  }

  out.be("div", null, "5", component, 0, 0);

  if (x) {
    out.t("A");
  } else if (y) {
    out.t("B");
  } else {
    out.t("C");
  }

  out.ee();
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType
};
export default _marko_template;