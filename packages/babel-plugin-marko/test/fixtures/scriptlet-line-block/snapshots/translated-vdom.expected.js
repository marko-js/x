import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _marko_template = _t(__filename),
      _marko_componentType = "C_B82F6C";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  var foo = 123;

  function bar() {}

  var baz = 456;
  out.be("div", {}, "0", component, 0, 0)
  console.log('foo');
  out.t("Hello there ")
  out.t(name)
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