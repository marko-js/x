import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";

const _marko_template = _t(__filename),
      _marko_componentType = "/babel-preset-marko$1.0.0/test/fixtures-html/doctype/template.marko";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.w("<!DOCTYPE html><html><head><title>Title of the document</title></head><body>The content of the document......</body></html>")
}, {
  ___type: _marko_componentType
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: "/babel-preset-marko$1.0.0/test/fixtures-html/doctype/template.marko"
}
export default _marko_template;