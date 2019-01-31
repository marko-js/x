import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/html";

const _marko_template = _t(__filename),
      _marko_componentType = "f5PlznI-";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  out.w("<div><div>Hello <div> </div> World</div><div> Hello</div><pre>\n    This should  \n      be preserved\n  </pre><div><div>Hello </div></div></div><div>")
  scriptletA();
  scriptletB();
  out.w("Hello ")
  scriptletC();
  out.w(" World")
  scriptletD();
  out.w("</div>")
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType
}
export default _marko_template;