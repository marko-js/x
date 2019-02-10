import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/html";

const _marko_template = _t(__filename),
      _marko_componentType = "bZPuqO3U";

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.w("<div class=\"test\"></div>");
}, {
  ___type: _marko_componentType,
  ___implicit: true
});
_marko_template.Component = _marko_defineComponent(null, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  deps: [{
    "type": "css",
    "code": ".test {\n    color: green;\n  }",
    "path": "./template.marko",
    "virtualPath": "./template.marko.css"
  }]
};
export default _marko_template;