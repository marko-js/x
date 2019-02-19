import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _marko_componentType = "Dw11N4il",
      _marko_template = _t(__filename),
      _marko_component = null;

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.be("svg", {
    "height": "100",
    "width": "100"
  }, "4", component, null, 1);
  out.e("circle", {
    "cx": "50",
    "cy": "50",
    "r": "40",
    "stroke": "black",
    "stroke-width": "3",
    "fill": "red"
  }, "0", component, 0, 1);
  out.be("a", null, "1", component, 0, 1);
  out.ee();
  out.be("style", null, "2", component, null, 1);
  out.t("div { color: green }");
  out.ee();
  out.be("script", null, "3", component, null, 1);
  out.t("alert(\"Hello\");");
  out.ee();
  out.ee();
  out.be("a", null, "5", component, 0, 0);
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