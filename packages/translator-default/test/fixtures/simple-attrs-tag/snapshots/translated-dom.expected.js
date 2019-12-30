const _marko_template = _t(__filename);

export default _marko_template;
import "marko/src/runtime/vdom/preserve-attrs";
import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t } from "marko/src/runtime/dom";

const _marko_componentType = _marko_registerComponent("fQi0Vsvi", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.be("div", {
    "style": "c:1px;",
    "id": "a",
    "class": "b"
  }, "0", component, 0, 1);
  out.ee();
  out.be("div", {
    "style": "c:1px;",
    "id": "a"
  }, "1", component, 0, 1);
  out.ee();
  out.be("div", {
    "style": "c:1px;"
  }, "2", component, 0, 1);
  out.ee();
  out.be("div", {
    "style": "c:1px;"
  }, "3", component, 0, 0, {
    noupdate: ["style"]
  });
  out.ee();
  out.be("div", {
    "a": "1",
    "style": "c:1px;"
  }, "4", component, 0, 0);
  out.ee();
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType
};