import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import _customTag from "./components/custom-tag/index.marko";

const _marko_template = _t(__filename),
      _marko_componentType = "/babel-preset-marko$1.0.0/test/fixtures/at-tag-inside-if-tag/template.marko";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  let _thing = null;

  if (x) {
    _thing = {
      "x": 1,
      "renderBody": out => {
        out.t("Hello");
      }
    };
  }

  _customTag({
    "thing": _thing
  }, out, "0")
}, {
  ___type: _marko_componentType
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/custom-tag/index.marko"]
}
export default _marko_template;