export default (input => {
  _loop(arr, (val, i) => {
    _beginEl("div");

    _dynamicText(i);

    _text(": ");

    _dynamicText(val);

    _endEl();
  });

  _loop(arr, (val, i, list) => {
    _beginEl("div");

    _dynamicText(i);

    _text(" of ");

    _dynamicText(_compute(() => list.length));

    _text(": ");

    _dynamicText(val);

    _endEl();
  }, (val, i) => _get(i));

  _loop(_compute(() => [].concat(_get(input.x), _get(input.y))), (val, i) => {
    _beginEl("div");

    _dynamicText(i);

    _text(": ");

    _dynamicText(val);

    _endEl();
  }, _compute(() => memo(val => doCalc(_get(val)))));
});
import { dynamicText as _dynamicText, text as _text, beginEl as _beginEl, endEl as _endEl, loop as _loop, get as _get, compute as _compute } from "fluurt";