import _marko_component from "./component.js";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/html";

const _marko_componentType = "TtHlZ7aS",
      _marko_template = _t(__filename),
      _marko_component2 = _marko_component;

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.w("<div></div>");
}, {
  ___type: _marko_componentType
}, _marko_component2);
_marko_template.Component = _marko_defineComponent(_marko_component2, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  component: "./component.js"
};
export default _marko_template;