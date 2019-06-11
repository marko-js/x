import "marko/src/runtime/vdom/preserve-attrs";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/runtime/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _marko_componentType = "i58_DLy_",
      _marko_template = _t(__filename),
      _marko_component = null;

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.be("div", null, "2", component, null, 0);
  out.e("input", {
    "value": input.defaultValue
  }, "0", component, 0, 0, {
    noupdate: ["value"]
  });
  out.e("input", {
    "type": "checkbox",
    "value": input.defaultValue,
    "checked": input.checked
  }, "1", component, 0, 0, {
    noupdate: ["value", "checked"]
  });
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