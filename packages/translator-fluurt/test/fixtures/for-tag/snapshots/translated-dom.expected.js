const _marko_template = _t(__filename);

export default _marko_template;
import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t } from "marko/src/runtime/dom";

const _marko_componentType = _marko_registerComponent("50Cpmzyl", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  let _i = 0;

  for (const val of arr) {
    let i = _i++;
    out.be("div", null, "1", component, null, 0);
    out.t(i);
    out.t(": ");
    out.t(val);
    out.ee();
    out.be("div", null, "2", component, 0, 0);
    out.ee();
    out.be("div", null, "3", component, 0, 0);
    out.ee();
  }

  for (const key in obj) {
    const val = obj[key];
    out.be("div", null, "5", component, null, 0);
    out.t(key);
    out.t(": ");
    out.t(val);
    out.ee();
    out.be("div", null, "6", component, 0, 0);
    out.ee();
    out.be("div", null, "7", component, 0, 0);
    out.ee();
  }

  for (let _i2 = 0; _i2 <= 10; _i2 += 2) {
    const i = _i2;
    out.be("div", null, "9", component, null, 0);
    out.t(i);
    out.ee();
    out.be("div", null, "10", component, 0, 0);
    out.ee();
    out.be("div", null, "11", component, 0, 0);
    out.ee();
  }

  let _i3 = 0;

  for (const val of arr) {
    let i = _i3++;
    out.be("div", null, `@${i}`, component, null, 0);
    out.t(i);
    out.t(": ");
    out.t(val);
    out.ee();
    out.be("div", null, "14", component, 0, 0);
    out.ee();
    out.be("div", null, `@other-${i}`, component, 0, 0);
    out.ee();
  }

  let _i4 = 0;
  const list = arr;

  for (const val of list) {
    let i = _i4++;
    out.be("div", null, `@${i}`, component, null, 0);
    out.t(list.length);
    out.t(": ");
    out.t(val);
    out.ee();
  }

  for (const key in obj) {
    const val = obj[key];
    out.be("div", null, `@${key}`, component, null, 0);
    out.t(key);
    out.t(": ");
    out.t(val);
    out.ee();
    out.be("div", null, "20", component, 0, 0);
    out.ee();
    out.be("div", null, `@other-${key}`, component, 0, 0);
    out.ee();
  }

  for (let _i6 = 0; _i6 <= 10; _i6 += 2) {
    const i = _i6;
    out.be("div", null, `@${i}`, component, null, 0);
    out.t(i);
    out.ee();
    out.be("div", null, "24", component, 0, 0);
    out.ee();
    out.be("div", null, `@other-${i}`, component, 0, 0);
    out.ee();

    for (let _i5 = 0; _i5 <= 10; _i5 += 2) {
      const i = _i5;
      out.be("div", null, `@${i}`, component, null, 0);
      out.t(i);
      out.ee();
      out.be("div", null, "28", component, 0, 0);
      out.ee();
      out.be("div", null, `@other-${i}`, component, 0, 0);
      out.ee();
    }
  }

  for (let _i7 = 10; _i7 >= 0; _i7 += -2) {
    const i = _i7;
    out.be("div", null, `@${i}`, component, null, 0);
    out.t(i);
    out.ee();
    out.be("div", null, "32", component, 0, 0);
    out.ee();
    out.be("div", null, `@other-${i}`, component, 0, 0);
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