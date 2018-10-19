import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/html";

const _customTag2 = _t(_customTag);

import _customTag from "./components/custom-tag/index.marko";

const _marko_template = _t(__filename),
      _marko_componentType = "pVNVWkgr";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  let _thing = null;

  if (x) {
    _thing = {
      "x": 1,
      "renderBody": out => {
        out.w("Hello");
      }
    };
  }

  _customTag2({
    "thing": _thing
  }, out, "0")
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/custom-tag/index.marko"]
}
export default _marko_template;