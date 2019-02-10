import { d as _marko_dynamicTag } from "marko/src/runtime/html/helpers";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/html";

const _marko_template = _t(__filename),
      _marko_componentType = "TWYgfCZi";

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  _marko_dynamicTag(input.x, {
    "header": {
      "class": "my-header",
      "renderBody": out => {
        out.w("Header content");
      }
    },
    "footer": {
      "class": "my-footer",
      "renderBody": out => {
        out.w("Footer content");
      }
    },
    "renderBody": out => {
      out.w("Body content");
    }
  }, out, _component, "2");
}, {
  ___type: _marko_componentType,
  ___implicit: true
});
_marko_template.Component = _marko_defineComponent(null, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType
};
export default _marko_template;