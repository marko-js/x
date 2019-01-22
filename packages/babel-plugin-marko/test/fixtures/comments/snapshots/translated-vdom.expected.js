import _htmlComment from "marko/src/taglibs/html/html-comment-tag.js";
import { t as _t } from "marko/src/runtime/vdom/helpers";

const _htmlComment_tag = _t(_htmlComment);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_template = _t2(__filename),
      _marko_componentType = "cmjBZ1aK";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.be("div", {}, "0", component, 0, 0)

  _htmlComment_tag({
    "renderBody": out => {
      out.t("abc");
    }
  }, out, "1")

  out.ee()
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