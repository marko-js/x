import _testHello from "./tags/test-hello/renderer.js";
import { t as _t } from "marko/src/runtime/vdom/helpers";

const _testHello_tag = _t(_testHello);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_componentType = "J6ObXtms",
      _marko_template = _t2(__filename),
      _marko_component = null;

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  _testHello_tag({
    "name": "World"
  }, out, "0");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./tags/test-hello/renderer.js"]
};
export default _marko_template;