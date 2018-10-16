import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import _htmlComment from "marko/src/taglibs/html/html-comment-tag.js";

const _marko_template = _t(__filename),
      _marko_componentType = "Lx4dIEHb";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  _htmlComment({
    "renderBody": out => {
      out.t("test");
    }
  }, out, "0")
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["marko/src/taglibs/html/html-comment-tag.js"]
}
export default _marko_template;