import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import _customTagData from "./custom-tag-data-tag.js";

const _marko_template = _t(__filename),
      _marko_componentType = "/babel-preset-marko$1.0.0/test/fixtures-html/custom-tag-data/template.marko";

_marko_template._ = _marko_renderer(_marko_render, {
  ___type: _marko_componentType
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
export default _marko_template;

function _marko_render(input, out, __component, component, state) {
  _customTagData({
    "name": "Frank".toUpperCase(),
    "age": 32
  }, out, "0")
}

_marko_template.meta = {
  id: "/babel-preset-marko$1.0.0/test/fixtures-html/custom-tag-data/template.marko",
  tags: ["./custom-tag-data-tag.js"]
}