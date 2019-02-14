import { a as _marko_attr } from "marko/src/runtime/html/helpers";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/html";

const _marko_componentType = "i58_DLy_",
      _marko_template = _t(__filename),
      _marko_component = null;

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.w(`<div><input${_marko_attr("value", input.defaultValue)}${_marko_attr("data-marko", {
    noupdate: ["value"]
  })}><input type="checkbox"${_marko_attr("value", input.defaultValue)}${_marko_attr("checked", input.checked)}${_marko_attr("data-marko", {
    noupdate: ["value", "checked"]
  })}></div>`);
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType
};
export default _marko_template;