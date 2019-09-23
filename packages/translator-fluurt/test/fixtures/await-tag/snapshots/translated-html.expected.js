const _marko_template = _t2(__filename);

export default _marko_template;
import { x as _marko_escapeXml, t as _t } from "marko/src/runtime/html/helpers";
import _await from "marko/src/core-tags/core/await/renderer.js";

const _await_tag = _t(_await);

import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t2 } from "marko/src/runtime/html";

const _marko_componentType = _marko_registerComponent("xGZ7_UIQ", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  _await_tag({
    "_provider": promise,
    "_name": "promise",
    "then": {
      "renderBody": (out, result) => {
        out.w(_marko_escapeXml(result));
      }
    }
  }, out, _component, "0");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["marko/src/core-tags/core/await/renderer.js"]
};