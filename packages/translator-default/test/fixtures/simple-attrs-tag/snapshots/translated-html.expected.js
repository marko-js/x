const _marko_template = _t(__filename);

export default _marko_template;
import { marko_attr as _marko_attr } from "marko/src/runtime/html/helpers/attr";
import _marko_renderer from "marko/src/runtime/components/renderer";
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "fQi0Vsvi",
      _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.w(`<div style="c:1px;" id="a" class="b"></div><div style="c:1px;" id="a"></div><div style="c:1px;"></div><div style="c:1px;"${_marko_attr("data-marko", {
    noupdate: ["style"]
  }, false)}></div><div a="1" style="c:1px;"></div>`);
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.meta = {
  id: _marko_componentType
};