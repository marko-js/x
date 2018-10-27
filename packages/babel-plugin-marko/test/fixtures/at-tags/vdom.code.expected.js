import _hello from "./components/hello/index.marko";
import { t as _t } from "marko/src/runtime/vdom/helpers";

const _hello_tag = _t(_hello);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_template = _t2(__filename),
      _marko_componentType = "M1Eai0XC";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  _hello_tag({
    "foo": {
      "renderBody": out => {
        out.t("Foo!");
      }
    }
  }, out, "0")
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/hello/index.marko"]
}
export default _marko_template;