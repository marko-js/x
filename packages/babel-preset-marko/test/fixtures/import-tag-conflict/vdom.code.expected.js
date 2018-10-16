import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { asset as test } from "./test1/asset";
import { asset } from "./test2/asset";

const _marko_template = _t(__filename),
      _marko_componentType = "/babel-preset-marko$1.0.0/test/fixtures-html/import-tag-conflict/template.marko";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {}, {
  ___type: _marko_componentType
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: "/babel-preset-marko$1.0.0/test/fixtures-html/import-tag-conflict/template.marko"
}
export default _marko_template;