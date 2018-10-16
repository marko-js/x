import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers";

const _marko_template = _t(__filename),
      _marko_componentType = "/babel-preset-marko$1.0.0/test/fixtures/simple/template.marko";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.w(`Hello${_marko_escapeXml(input.name)}!`)

  if (input.colors.length) {
    out.w("<ul>");

    for (const color of input.colors) {
      out.w(`<li>${_marko_escapeXml(color)}</li>`);
    }

    out.w("</ul>");
  } else {
    out.w("<div>No colors!</div>");
  }
}, {
  ___type: _marko_componentType
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType
}
export default _marko_template;