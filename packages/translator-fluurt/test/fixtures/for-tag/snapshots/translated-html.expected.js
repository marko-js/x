export default function _renderer(input) {
  let _i = 0;

  for (const val of arr) {
    let i = _i++;

    _write(`<div>${_xml(i)}: ${_xml(val)}</div>`);
  }

  for (const key in obj) {
    const val = obj[key];

    _write(`<div>${_xml(key)}: ${_xml(val)}</div>`);
  }

  for (let _i2 = 0; _i2 <= 10; _i2 += 2) {
    const i = _i2;

    _write(`<div>${_xml(i)}</div>`);
  }

  for (let _i3 = 10; _i3 <= 0; _i3 += -2) {
    const i = _i3;

    _write(`<div>${_xml(i)}</div>`);
  }

  let _i4 = 0;
  const list = arr;

  for (const val of list) {
    let i = _i4++;

    _write(`<div>${_xml(i)} of ${_xml(list.length)}: ${_xml(val)}</div>`);
  }

  let _i5 = 0;

  for (const val of [].concat(input.x, input.y)) {
    let i = _i5++;

    _write(`<div>${_xml(i)}: ${_xml(val)}</div>`);
  }
}
import { createRenderer as _createRenderer, register as _register, xml as _xml, write as _write } from "fluurt/html";

const _render = _createRenderer(_register("iIgIrt6K", _renderer));

export { _render as render };