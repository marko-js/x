const _marko_template = _t(__filename);

export default _marko_template;
import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers/escape-xml";
import _marko_renderer from "marko/src/runtime/components/renderer";
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

  for (let _steps = (10 - 0) / 2, _step = 0; _step <= _steps; _step++) {
    const i = 0 + _step * 2;
    out.w(`<div>${_marko_escapeXml(i)}</div><div></div><div></div>`);
  }

  let _i2 = 0;

  for (const val of arr) {
    let i = _i2++;
    const _loopKey = `@${i}`;
    out.w(`<div>${_marko_escapeXml(i)}: ${_marko_escapeXml(val)}</div><div></div><div></div>`);
  }

  let _i3 = 0;
  const list = arr;

  for (const val of list) {
    let i = _i3++;
    const _loopKey2 = `@${i}`;
    out.w(`<div>${_marko_escapeXml(list.length)}: ${_marko_escapeXml(val)}</div>`);
  }

  for (const key in obj) {
    const val = obj[key];
    const _loopKey3 = `@${key}`;
    out.w(`<div>${_marko_escapeXml(key)}: ${_marko_escapeXml(val)}</div><div></div><div></div>`);
  }

  for (let _steps3 = (10 - 0) / 2, _step3 = 0; _step3 <= _steps3; _step3++) {
    const i = 0 + _step3 * 2;
    const _loopKey4 = `@${i}`;
    out.w(`<div>${_marko_escapeXml(i)}</div><div></div><div></div>`);

    for (let _steps2 = (10 - 0) / 2, _step2 = 0; _step2 <= _steps2; _step2++) {
      const i = 0 + _step2 * 2;
      const _loopKey5 = `@${i}`;
      out.w(`<div>${_marko_escapeXml(i)}</div><div></div><div></div>`);
    }
  }

  for (let _steps4 = (0 - 10) / -2, _step4 = 0; _step4 <= _steps4; _step4++) {
    const i = 10 + _step4 * -2;
    const _loopKey6 = `@${i}`;
    out.w(`<div>${_marko_escapeXml(i)}</div><div></div><div></div>`);
  }
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.meta = {
  id: _marko_componentType
};