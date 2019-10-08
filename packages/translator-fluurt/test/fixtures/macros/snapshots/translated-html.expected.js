export default (input => {
  function _renderTree(node) {
    _write(`Name: ${_xml(node.name)} Children: `);

    if (node.children) {
      _write("<ul>");

      _loop(node.children, child => {
        _write("<li>");

        _dynamicTag(_renderTree, child);

        _write("</li>");
      });

      _write("</ul>");
    }
  }

  _dynamicTag(_renderTree, input.node);
});
import { write as _write, xml as _xml } from "fluurt/html";
import { dynamicTag as _dynamicTag, loop as _loop } from "fluurt";