function _renderTree(node, out) {
  out.w(`Name:${_marko_escapeXml(node.name)}Children:`);

  if (node.children) {
    out.w("<ul>");

    for (const child of node.children) {
      out.w("<li>");

      _renderTree({ ...child
      }, out);

      out.w("</li>");
    }

    out.w("</ul>");
  }
}

import { x as _marko_escapeXml } from "marko/src/runtime/html/helpers";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t } from "marko/src/runtime/html";

const _marko_template = _t(__filename),
      _marko_componentType = "9QKeN8cm";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  _renderTree({ ...input.node
  }, out)
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType
}
export default _marko_template;