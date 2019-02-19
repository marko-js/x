import _marko_style_merge from "marko/src/runtime/vdom/helper-styleAttr";
import { a as _marko_attr } from "marko/src/runtime/html/helpers";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/html";

const _marko_componentType = "G7Zu4cGH",
      _marko_template = _t(__filename),
      _marko_component = null;

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.w(`<div class="b" id="a"${_marko_attr("style", _marko_style_merge({
    c: 1
  }))}></div><div id="a"${_marko_attr("style", _marko_style_merge({
    c: 1
  }))}></div><div${_marko_attr("style", _marko_style_merge({
    c: 1
  }))}></div><div${_marko_attr("style", _marko_style_merge({
    c: 1
  }))}${_marko_attr("data-marko", {
    noupdate: ["style"]
  }, false)}></div><div a="1"${_marko_attr("style", _marko_style_merge({
    c: 1
  }))}></div>`);
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType
};
export default _marko_template;