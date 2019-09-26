export default (input => {
  function _renderTree(node) {
    out.w("Name: ");
    out.w(_marko_escapeXml(node.name));
    out.w(" Children: ");

    const _ifBranch = () => {
      out.w("<ul>");

      _loop(node.children, child => {
        out.w("<li>");

        _dynamicTag(_renderTree, child);

        out.w("</li>");
      });

      out.w("</ul>");
    };

    _conditional(node.children && _ifBranch);
  }

  _dynamicTag(_renderTree, input.node);
});
import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers";
import { dynamicTag as _dynamicTag, loop as _loop, conditional as _conditional } from "fluurt";