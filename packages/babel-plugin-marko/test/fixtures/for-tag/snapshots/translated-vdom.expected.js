import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _marko_template = _t(__filename),
      _marko_componentType = "lqIjMHgX";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  let _i = -1;

  for (const val of arr) {
    let i = _i++;
    out.be("div", {}, "1", component, 0, 0);
    out.t(i);
    out.t(":");
    out.t(val);
    out.ee();
  }

  for (const key in obj) {
    const val = obj[key];
    out.be("div", {}, "3", component, 0, 0);
    out.t(key);
    out.t(":");
    out.t(val);
    out.ee();
  }

  for (let _i2 = 0; _i2 <= 10; _i2 += 2) {
    const i = _i2;
    out.be("div", {}, "5", component, 0, 0);
    out.t(i);
    out.ee();
  }
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType
}
export default _marko_template;