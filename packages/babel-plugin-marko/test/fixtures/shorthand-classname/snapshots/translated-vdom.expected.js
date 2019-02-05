import { cl as _marko_class_merge } from "marko/src/runtime/html/helpers";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _marko_template = _t(__filename),
      _marko_componentType = "OQLZ1bnz";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.be("div", {
    "class": "shorthand"
  }, "0", component, 0, 0)
  out.ee()
  out.be("div", {
    "class": "shorthand1 shorthand2"
  }, "1", component, 0, 0)
  out.ee()
  out.be("div", {
    "class": "shorthand1 shorthand2 inline"
  }, "2", component, 0, 0)
  out.ee()
  out.be("div", {
    "class": _marko_class_merge(["shorthand1 shorthand2", dynamic1])
  }, "3", component, 0, 0)
  out.ee()
  out.be("div", {
    "class": _marko_class_merge([dynamic1, "inline"])
  }, "4", component, 0, 0)
  out.ee()
  out.be("div", {
    "class": _marko_class_merge([dynamic1, "shorthand2", "inline"])
  }, "5", component, 0, 0)
  out.ee()
  out.be("div", {
    "class": _marko_class_merge([dynamic1, "shorthand2", dynamic2])
  }, "6", component, 0, 0)
  out.ee()
  out.be("div", {
    "class": _marko_class_merge([dynamic1, "shorthand2", dynamic2, dynamic3])
  }, "7", component, 0, 0)
  out.ee()
  out.be("div", {
    "class": _marko_class_merge(["partially-" + dynamic1, "shorthand2", dynamic2])
  }, "8", component, 0, 0)
  out.ee()
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType
}
export default _marko_template;