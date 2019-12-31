const _marko_template = _t(__filename);

export default _marko_template;
import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers/escape-xml";
import _marko_renderer from "marko/src/runtime/components/renderer";
import _marko_defineComponent from "marko/src/runtime/components/defineComponent";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "50Cpmzyl",
      _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  let _i = 0;

  for (const val of arr) {
    let i = _i++;
    out.w(`<div>${_marko_escapeXml(i)}: ${_marko_escapeXml(val)}</div><div></div><div></div>`);
  }

  for (const key in obj) {
    const val = obj[key];
    out.w(`<div>${_marko_escapeXml(key)}: ${_marko_escapeXml(val)}</div><div></div><div></div>`);
  }

  for (let _i2 = 0; _i2 <= 10; _i2 += 2) {
    const i = _i2;
    out.w(`<div>${_marko_escapeXml(i)}</div><div></div><div></div>`);
  }

  let _i3 = 0;

  for (const val of arr) {
    let i = _i3++;
    out.w(`<div>${_marko_escapeXml(i)}: ${_marko_escapeXml(val)}</div><div></div><div></div>`);
  }

  let _i4 = 0;
  const list = arr;

  for (const val of list) {
    let i = _i4++;
    out.w(`<div>${_marko_escapeXml(list.length)}: ${_marko_escapeXml(val)}</div>`);
  }

  for (const key in obj) {
    const val = obj[key];
    out.w(`<div>${_marko_escapeXml(key)}: ${_marko_escapeXml(val)}</div><div></div><div></div>`);
  }

  for (let _i6 = 0; _i6 <= 10; _i6 += 2) {
    const i = _i6;
    out.w(`<div>${_marko_escapeXml(i)}</div><div></div><div></div>`);

    for (let _i5 = 0; _i5 <= 10; _i5 += 2) {
      const i = _i5;
      out.w(`<div>${_marko_escapeXml(i)}</div><div></div><div></div>`);
    }
  }

  for (let _i7 = 10; _i7 >= 0; _i7 += -2) {
    const i = _i7;
    out.w(`<div>${_marko_escapeXml(i)}</div><div></div><div></div>`);
  }
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.meta = {
  id: _marko_componentType
};