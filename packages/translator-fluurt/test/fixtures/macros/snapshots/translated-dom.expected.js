export default function _renderer(input) {
  function _renderTree(node) {
    _text("Name: ");

    _dynamicText(_compute(() => node.name));

    _text(" Children: ");

    const _ifBranch = () => {
      _beginEl("ul");

      _loopOf(_compute(() => node.children), child => {
        _beginEl("li");

        _dynamicTag(_renderTree, child);

        _endEl();
      });

      _endEl();
    };

    _conditional(_compute(() => _get(node.children) && _ifBranch));
  }

  _dynamicTag(_renderTree, input.node);
}
import { createRenderer as _createRenderer, register as _register, text as _text, get as _get, compute as _compute, dynamicText as _dynamicText, dynamicTag as _dynamicTag, beginEl as _beginEl, endEl as _endEl, loopOf as _loopOf, conditional as _conditional } from "fluurt/dom";

const _render = _createRenderer(_register("7mQHbgfv", _renderer));

export { _render as render };