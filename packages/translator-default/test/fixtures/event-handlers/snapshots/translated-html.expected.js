const _marko_template = _t(__filename);

export default _marko_template;
import { marko_attr as _marko_attr } from "marko/src/runtime/html/helpers/attr";
import _customTag from "./components/custom-tag.marko";
import _marko_load_tag from "marko/src/runtime/helpers/load-tag";

const _customTag_tag = _marko_load_tag(_customTag);

import _marko_renderer from "marko/src/runtime/components/renderer";
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "0s1D5L6O",
      _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.w(`<div${_marko_attr("data-marko", {
    "onclick": _component.d("click", "handleClick", [a, b, ...d], false)
  }, false)}></div><div${_marko_attr("data-marko", {
    "onDashed-cased-Event": _component.d("Dashed-cased-Event", "handle", false)
  }, false)}></div><div onmouseout="someStringHandler"${_marko_attr("data-marko", {
    "oncamelcasedevent": _component.d("camelcasedevent", "handle", false)
  }, false)}></div>`);

  _customTag_tag(null, out, _component, "3", ["thing", "handleThing", false, [a, b, ...d]]);

  _customTag_tag(null, out, _component, "4", ["Dashed-cased-Event", "handle", false]);

  _customTag_tag(null, out, _component, "5", ["camelcasedEvent", "handle", false]);
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/custom-tag.marko"]
};