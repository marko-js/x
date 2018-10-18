import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import _testHello from "./tags/test-hello/renderer.js";

const _marko_template = _t(__filename),
      _marko_componentType = "6DyhDpsS";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  _testHello({
    "name": "World"
  }, out, "0")
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./tags/test-hello/renderer.js"]
}
export default _marko_template;