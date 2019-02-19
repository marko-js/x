import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _marko_componentType = "lqIjMHgX",
      _marko_template = _t(__filename),
      _marko_component = null;

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  let _i = -1;

  for (const val of arr) {
    let i = _i++;
    out.be("div", null, "0", component, null, 0);
    out.t(i);
    out.t(": ");
    out.t(val);
    out.ee();
  }

  for (const key in obj) {
    const val = obj[key];
    out.be("div", null, "2", component, null, 0);
    out.t(key);
    out.t(": ");
    out.t(val);
    out.ee();
  }

  for (let _i2 = 0; _i2 <= 10; _i2 += 2) {
    const i = _i2;
    out.be("div", null, "4", component, null, 0);
    out.t(i);
    out.ee();
  }
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType
};
export default _marko_template;