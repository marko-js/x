const _marko_template = _t(__filename);

export default _marko_template;
import _marko_renderer from "marko/src/runtime/components/renderer";
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
import { t as _t } from "marko/src/runtime/dom";
import { r as _marko_registerComponent } from "marko/runtime/components/registry-browser";

const _marko_componentType = _marko_registerComponent("Kc_RlNKk", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.t("Hello ");
  out.t(input.name);
  out.t("! ");

  if (input.colors.length) {
    out.be("ul", null, "1", component, null, 0);

    for (const color of input.colors) {
      out.be("li", null, "3", component, null, 0);
      out.t(color);
      out.ee();
    }

    out.ee();
  } else {
    out.be("div", null, "5", component, null, 0);
    out.t("No colors!");
    out.ee();
  }
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType
};