/*Compiled using marko@5.0.0 - DO NOT EDIT*/
const _marko_template = _t(__filename);

export default _marko_template;
import _marko_renderer from "marko/src/runtime/components/renderer";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "AXfGRiJb",
      _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  let i = 0;
  let _keyValue = 0;

  while (i < 10) {
    const _keyScope = `[${_keyValue++}]`;
    i++;
    out.w("<div></div>");
  }
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);

/*Compiled using marko@5.0.0 - DO NOT EDIT*/
_marko_template.meta = {
  id: _marko_componentType
};