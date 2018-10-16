import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import _hello from "./hello.marko";

const _marko_template = _t(__filename),
      _marko_componentType = "/babel-preset-marko$1.0.0/test/fixtures/custom-tag-template/template.marko";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  _hello({
    "name": "Frank"
  }, out, "0")
}, {
  ___type: _marko_componentType
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./hello.marko"]
}
export default _marko_template;