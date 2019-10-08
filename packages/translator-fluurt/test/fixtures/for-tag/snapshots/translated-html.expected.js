export default (input => {
  let _i = 0;

  for (const val of arr) {
    let i = _i++;

    _write(`<div>${_xml(i)}: ${_xml(val)}</div>`);
  }

  let _i2 = 0;
  const list = arr;

  for (const val of list) {
    let i = _i2++;

    _write(`<div>${_xml(i)} of ${_xml(list.length)}: ${_xml(val)}</div>`);
  }

  let _i3 = 0;

  for (const val of [].concat(input.x, input.y)) {
    let i = _i3++;

    _write(`<div>${_xml(i)}: ${_xml(val)}</div>`);
  }
});
import { xml as _xml, write as _write } from "fluurt/html";