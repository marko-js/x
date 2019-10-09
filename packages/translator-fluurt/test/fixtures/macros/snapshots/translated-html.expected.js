export default function _renderer(input) {
  function _renderTree(node) {
    _write(`Name: ${_xml(node.name)} Children: `);

    if (node.children) {
      _write("<ul>");

      for (const child of node.children) {
        _write("<li>");

        _dynamicTag(_renderTree, child);

        _write("</li>");
      }

      _write("</ul>");
    }
  }

  _dynamicTag(_renderTree, input.node);
}
import { createRenderer as _createRenderer, register as _register, write as _write, xml as _xml, dynamicTag as _dynamicTag } from "fluurt/html";

const _render = _createRenderer(_register("7mQHbgfv", _renderer));

export { _render as render };