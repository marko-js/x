import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import _initComponents from "marko/src/components/taglib/init-components-tag.js";
import { t as _t } from "marko/src/runtime/html";
import _componentGlobals from "marko/src/components/taglib/component-globals-tag.js";

const _marko_template = _t(__filename),
      _marko_componentType = "Fr76d7a7";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.w("<!DOCTYPE html><html><head><title>Title of the document</title></head><body>")
  {
    const _componentGlobals_tag = _t(_componentGlobals);

    _componentGlobals_tag(null, out, "4");

    out.w("The content of the document......");

    const _initComponents_tag = _t(_initComponents);

    _initComponents_tag(null, out, "5");
  }
  out.w("</body></html>")
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["marko/src/components/taglib/component-globals-tag.js", "marko/src/components/taglib/init-components-tag.js"]
}
export default _marko_template;