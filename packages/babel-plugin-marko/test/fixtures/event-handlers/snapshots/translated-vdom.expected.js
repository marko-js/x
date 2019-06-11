import _customTag from "./components/custom-tag.marko";
import { t as _t } from "marko/src/runtime/vdom/helpers";

const _customTag_tag = _t(_customTag);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/runtime/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_componentType = "SSsZKEJG",
      _marko_template = _t2(__filename),
      _marko_component = null;

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.be("div", null, "0", component, 0, 0, {
    "onclick": _component.d("click", "handleClick", [a, b, ...d], false)
  });
  out.ee();
  out.be("div", null, "1", component, 0, 0, {
    "onDashed-cased-Event": _component.d("Dashed-cased-Event", "handle", false)
  });
  out.ee();
  out.be("div", null, "2", component, 0, 0, {
    "oncamelcasedevent": _component.d("camelcasedevent", "handle", false)
  });
  out.ee();

  _customTag_tag({}, out, "3", ["thing", "handleThing", false, [a, b, ...d]]);

  _customTag_tag({}, out, "4", ["Dashed-cased-Event", "handle", false]);

  _customTag_tag({}, out, "5", ["camelcasedEvent", "handle", false]);
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/custom-tag.marko"]
};
export default _marko_template;