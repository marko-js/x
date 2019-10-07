export default (input => {
  function _renderTree(node) {
    _write("Name: ");

    _write(_xml(node.name));

    _write(" Children: ");

    const _ifBranch = () => {
      _write("<ul>");

      _loop(node.children, child => {
        _write("<li>");

        _dynamicTag(_renderTree, child);

        _write("</li>");
      });

      _write("</ul>");
    };

    _conditional(node.children && _ifBranch);
  }

  _dynamicTag(_renderTree, input.node);
});
import { write as _write, xml as _xml } from "fluurt/html";
import { dynamicTag as _dynamicTag, loop as _loop, conditional as _conditional } from "fluurt";