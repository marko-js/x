export default function _renderer(input) {
  const x = new _Signal(1);

  _beginEl("div");

  {
    const y = new _Signal(2);

    _dynamicText(_compute(() => _get(x) + _get(y)));

    _beginEl("button");

    _on("click", () => {
      _set(_get(x), _get(x) + 1);

      _set(_get(y), _get(y) + 1);
    });

    _endEl();
  }

  _endEl();
}
import { createRenderer as _createRenderer, register as _register, set as _set, Signal as _Signal, get as _get, compute as _compute, dynamicText as _dynamicText, beginEl as _beginEl, endEl as _endEl } from "fluurt/dom";

const _render = _createRenderer(_register("wNgFehEa", _renderer));

export { _render as render };
import { on as _on } from "fluurt";