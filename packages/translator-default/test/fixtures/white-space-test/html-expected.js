/*Compiled using marko@5.0.0 - DO NOT EDIT*/
const _marko_template = _t(__filename);

export default _marko_template;
import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers/escape-xml";
import _marko_renderer from "marko/src/runtime/components/renderer";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "_XScaIR4",
      _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.w("<div><div>Hello <div> </div> World</div><div> Hello</div><pre>\n    This should  \n      be preserved\n  </pre><div><div>Hello </div></div></div><div>");
  scriptletA();
  scriptletB();
  out.w("Hello ");
  scriptletC();
  out.w("World");
  scriptletD();
  out.w(`</div> Hello World! ${_marko_escapeXml(a)}${_marko_escapeXml(b)}<div></div>`);
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);

/*Compiled using marko@5.0.0 - DO NOT EDIT*/
_marko_template.meta = {
  id: _marko_componentType
};