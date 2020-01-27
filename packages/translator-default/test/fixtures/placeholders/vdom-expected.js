/*Compiled using marko@5.0.0 - DO NOT EDIT*/
const _marko_template = _t(__filename);

export default _marko_template;
import _marko_renderer from "marko/src/runtime/components/renderer";
import { t as _t } from "marko/src/runtime/dom";
import { r as _marko_registerComponent } from "marko/src/runtime/components/registry-browser";

const _marko_componentType = _marko_registerComponent("r3enEli9", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.be("div", null, "0", component, null, 0);
  out.t(input.x);
  out.t("Hello world <a/>");
  out.h(input.x);
  out.h("Hello world <a/>");
  out.be("script", null, "1", component, null, 0);
  out.t("\n    ");
  out.t("Hello <b> </script>");
  out.t("\n  ");
  out.ee();
  out.be("style", null, "2", component, null, 0);
  out.t("\n    ");
  out.t("Hello <b> </style>");
  out.t("\n  ");
  out.ee();
  out.ee();
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);

/*Compiled using marko@5.0.0 - DO NOT EDIT*/
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType
};