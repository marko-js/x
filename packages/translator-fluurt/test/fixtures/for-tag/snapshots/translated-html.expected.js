export default (input => {
  _loop(arr, (val, i) => {
    _write(`<div>${_xml(i)}: ${_xml(val)}</div>`);
  });

  _loop(arr, (val, i, list) => {
    _write(`<div>${_xml(i)} of ${_xml(list.length)}: ${_xml(val)}</div>`);
  }, (val, i) => i);

  _loop([].concat(input.x, input.y), (val, i) => {
    _write(`<div>${_xml(i)}: ${_xml(val)}</div>`);
  }, memo(val => doCalc(val)));
});
import { xml as _xml, write as _write } from "fluurt/html";
import { loop as _loop } from "fluurt";