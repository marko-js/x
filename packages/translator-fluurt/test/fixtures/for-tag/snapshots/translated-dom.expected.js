export default function _renderer(input) {
  _loopOf(arr, (val, i) => {
    _beginEl("div");

    _dynamicText(i);

    _text(": ");

    _dynamicText(val);

    _endEl();
  });

  _loopIn(obj, (key, val) => {
    _beginEl("div");

    _dynamicText(key);

    _text(": ");

    _dynamicText(val);

    _endEl();
  });

  _loopFrom(0, 10, 2, i => {
    _beginEl("div");

    _dynamicText(i);

    _endEl();
  });

  _loopFrom(10, 0, -2, i => {
    _beginEl("div");

    _dynamicText(i);

    _endEl();
  });

  _loopOf(arr, (val, i, list) => {
    _beginEl("div");

    _dynamicText(i);

    _text(" of ");

    _dynamicText(_compute(() => list.length));

    _text(": ");

    _dynamicText(val);

    _endEl();
  }, (val, i) => _get(i));

  _loopOf(_compute(() => [].concat(_get(input.x), _get(input.y))), (val, i) => {
    _beginEl("div");

    _dynamicText(i);

    _text(": ");

    _dynamicText(val);

    _endEl();
  }, _compute(() => memo(val => doCalc(_get(val)))));
}
import { createRenderer as _createRenderer, register as _register, dynamicText as _dynamicText, text as _text, beginEl as _beginEl, endEl as _endEl, loopOf as _loopOf, loopIn as _loopIn, loopFrom as _loopFrom, get as _get, compute as _compute } from "fluurt/dom";

const _render = _createRenderer(_register("iIgIrt6K", _renderer));

export { _render as render };