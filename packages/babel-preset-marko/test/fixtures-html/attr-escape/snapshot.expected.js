import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { cl as _marko_class_merge, a as _marko_attr } from "marko/src/runtime/html/helpers";

const _marko_template = _t(__filename),
      _marko_componentType = "/babel-preset-marko$1.0.0/test/fixtures-html/attr-escape/template.marko";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.w(`<div${_marko_attr("class", _marko_class_merge(input.className))}${_marko_attr("foo", 'a' + input.foo + 'b')}${_marko_attr("bar", `a ${input.foo} b`)}></div>`)
}, {
  ___type: _marko_componentType
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: "/babel-preset-marko$1.0.0/test/fixtures-html/attr-escape/template.marko"
}
export default _marko_template;