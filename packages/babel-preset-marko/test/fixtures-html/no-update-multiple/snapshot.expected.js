import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { a as _marko_attr } from "marko/src/runtime/html/helpers";

const _marko_template = _t(__filename),
      _marko_componentType = "/babel-preset-marko$1.0.0/test/fixtures-html/no-update-multiple/template.marko";

_marko_template._ = _marko_renderer(_marko_render, {
  ___type: _marko_componentType
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
export default _marko_template;

function _marko_render(input, out, __component, component, state) {
  out.w(`<div><input${_marko_attr("value", input.defaultValue)}><input${_marko_attr("value", input.defaultValue)}></div>`)
}

_marko_template.meta = {
  id: "/babel-preset-marko$1.0.0/test/fixtures-html/no-update-multiple/template.marko"
}