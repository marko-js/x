const _marko_template = _t(__filename);

export default _marko_template;
import _marko_renderer from "marko/src/runtime/components/renderer";
import { t as _t } from "marko/src/runtime/dom";
import { r as _marko_registerComponent } from "marko/runtime/components/registry-browser";

const _marko_componentType = _marko_registerComponent("50Cpmzyl", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  let _i = 0;

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
    out.be("div", null, "3", component, null, 0);
    out.t(key);
    out.t(": ");
    out.t(val);
    out.ee();
    out.be("div", null, "4", component, 0, 0);
    out.ee();
    out.be("div", null, "5", component, 0, 0);
    out.ee();
  }

  for (let _steps = (10 - 0) / 2, _step = 0; _step <= _steps; _step++) {
    const i = 0 + _step * 2;
    out.be("div", null, "6", component, null, 0);
    out.t(i);
    out.ee();
    out.be("div", null, "7", component, 0, 0);
    out.ee();
    out.be("div", null, "8", component, 0, 0);
    out.ee();
  }

  let _i2 = 0;

  for (const val of arr) {
    let i = _i2++;
    const _loopKey = `@${i}`;
    out.be("div", null, _loopKey, component, null, 0);
    out.t(i);
    out.t(": ");
    out.t(val);
    out.ee();
    out.be("div", null, `9[${_loopKey}]`, component, 0, 0);
    out.ee();
    out.be("div", null, `@other-${i}`, component, 0, 0);
    out.ee();
  }

  let _i3 = 0;
  const list = arr;

  for (const val of list) {
    let i = _i3++;
    const _loopKey2 = `@${i}`;
    out.be("div", null, _loopKey2, component, null, 0);
    out.t(list.length);
    out.t(": ");
    out.t(val);
    out.ee();
  }

  for (const key in obj) {
    const val = obj[key];
    const _loopKey3 = `@${key}`;
    out.be("div", null, _loopKey3, component, null, 0);
    out.t(key);
    out.t(": ");
    out.t(val);
    out.ee();
    out.be("div", null, `10[${_loopKey3}]`, component, 0, 0);
    out.ee();
    out.be("div", null, `@other-${key}`, component, 0, 0);
    out.ee();
  }

  for (let _steps3 = (10 - 0) / 2, _step3 = 0; _step3 <= _steps3; _step3++) {
    const i = 0 + _step3 * 2;
    const _loopKey4 = `@${i}`;
    out.be("div", null, _loopKey4, component, null, 0);
    out.t(i);
    out.ee();
    out.be("div", null, `11[${_loopKey4}]`, component, 0, 0);
    out.ee();
    out.be("div", null, `@other-${i}`, component, 0, 0);
    out.ee();

    for (let _steps2 = (10 - 0) / 2, _step2 = 0; _step2 <= _steps2; _step2++) {
      const i = 0 + _step2 * 2;
      const _loopKey5 = `@${i}`;
      out.be("div", null, _loopKey5, component, null, 0);
      out.t(i);
      out.ee();
      out.be("div", null, `12[${_loopKey4}][${_loopKey5}]`, component, 0, 0);
      out.ee();
      out.be("div", null, `@other-${i}`, component, 0, 0);
      out.ee();
    }
  }

  for (let _steps4 = (0 - 10) / -2, _step4 = 0; _step4 <= _steps4; _step4++) {
    const i = 10 + _step4 * -2;
    const _loopKey6 = `@${i}`;
    out.be("div", null, _loopKey6, component, null, 0);
    out.t(i);
    out.ee();
    out.be("div", null, `13[${_loopKey6}]`, component, 0, 0);
    out.ee();
    out.be("div", null, `@other-${i}`, component, 0, 0);
    out.ee();
  }
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType
};