/*Compiled using marko@5.0.0 - DO NOT EDIT*/
const _marko_template = _t(__filename);

export default _marko_template;
import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers/escape-xml";
import _marko_to_string from "marko/src/runtime/helpers/to-string";
import _marko_renderer from "marko/src/runtime/components/renderer";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "r3enEli9",
      _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.w(`<div>${_marko_escapeXml(input.x)}Hello world &lt;a/>${_marko_to_string(input.x)}Hello world <a/><script>\n    Hello <b> \\u003C/script>\n  </script><style>\n    Hello <b> \\003C/style>\n  </style></div>`);
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);

/*Compiled using marko@5.0.0 - DO NOT EDIT*/
_marko_template.meta = {
  id: _marko_componentType
};