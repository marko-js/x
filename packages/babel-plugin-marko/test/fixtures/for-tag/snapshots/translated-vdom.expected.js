import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _marko_template = _t(__filename),
      _marko_componentType = _marko_registerComponent("lqIjMHgX", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  let _i = -1;

  for (const val of arr) {
    let i = _i++;
    out.be("div", null, "0", component, null, 0);
    out.t(i);
    out.t(": ");
    out.t(val);
    out.ee();
    out.be("div", null, "1", component, 0, 0);
    out.ee();
    out.be("div", null, "2", component, 0, 0);
    out.ee();
  }

  for (const key in obj) {
    const val = obj[key];
    out.be("div", null, "4", component, null, 0);
    out.t(key);
    out.t(": ");
    out.t(val);
    out.ee();
    out.be("div", null, "5", component, 0, 0);
    out.ee();
    out.be("div", null, "6", component, 0, 0);
    out.ee();
  }

  for (let _i2 = 0; _i2 <= 10; _i2 += 2) {
    const i = _i2;
    out.be("div", null, "8", component, null, 0);
    out.t(i);
    out.ee();
    out.be("div", null, "9", component, 0, 0);
    out.ee();
    out.be("div", null, "10", component, 0, 0);
    out.ee();
  }

  let _i3 = -1;

  for (const val of arr) {
    let i = _i3++;
    const _loopKey = `@${i}`;
    out.be("div", null, _loopKey, component, null, 0);
    out.t(i);
    out.t(": ");
    out.t(val);
    out.ee();
    out.be("div", null, `12[${_loopKey}]`, component, 0, 0);
    out.ee();
    out.be("div", null, `@other-${i}`, component, 0, 0);
    out.ee();
  }

  for (const key in obj) {
    const val = obj[key];
    const _loopKey2 = `@${key}`;
    out.be("div", null, _loopKey2, component, null, 0);
    out.t(key);
    out.t(": ");
    out.t(val);
    out.ee();
    out.be("div", null, `14[${_loopKey2}]`, component, 0, 0);
    out.ee();
    out.be("div", null, `@other-${key}`, component, 0, 0);
    out.ee();
  }

  for (let _i5 = 0; _i5 <= 10; _i5 += 2) {
    const i = _i5;
    const _loopKey3 = `@${i}`;
    out.be("div", null, _loopKey3, component, null, 0);
    out.t(i);
    out.ee();
    out.be("div", null, `16[${_loopKey3}]`, component, 0, 0);
    out.ee();
    out.be("div", null, `@other-${i}`, component, 0, 0);
    out.ee();

    for (let _i4 = 0; _i4 <= 10; _i4 += 2) {
      const i = _i4;
      const _loopKey4 = `@${i}`;
      out.be("div", null, _loopKey4, component, null, 0);
      out.t(i);
      out.ee();
      out.be("div", null, `17[${_loopKey3}][${_loopKey4}]`, component, 0, 0);
      out.ee();
      out.be("div", null, `@other-${i}`, component, 0, 0);
      out.ee();
    }
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