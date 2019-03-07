import _await from "marko/src/taglibs/core/await/renderer.js";
import { t as _t } from "marko/src/runtime/vdom/helpers";

const _await_tag = _t(_await);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_componentType = "soLLeMUj",
      _marko_template = _t2(__filename),
      _marko_component = null;

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  _await_tag({
    "_provider": promise,
    "_name": "promise",
    "then": {
      "renderBody": (out, result) => {
        out.t(result);
      }
    }
  }, out, "1");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["marko/src/taglibs/core/await/renderer.js"]
};
export default _marko_template;