const _marko_template = _t(__filename);

export default _marko_template;
import { marko_attr as _marko_attr } from "marko/src/runtime/html/helpers/attr";
import _marko_renderer from "marko/src/runtime/components/renderer";
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "nQxCtzDQ",
      _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.w(`<div><input${_marko_attr("value", input.defaultValue)}${_marko_attr("data-marko", {
    noupdate: ["value"]
  }, false)}><input type="checkbox"${_marko_attr("value", input.defaultValue)}${_marko_attr("checked", input.checked)}${_marko_attr("data-marko", {
    noupdate: ["value", "checked"]
  }, false)}></div>`);
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.meta = {
  id: _marko_componentType
};