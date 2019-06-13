import { x as _marko_escapeXml, d as _marko_dynamicTag } from "marko/src/runtime/html/helpers";
import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t } from "marko/src/runtime/html";

const _marko_template = _t(__filename),
      _marko_componentType = _marko_registerComponent("9QKeN8cm", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  function _renderTree(node, out) {
    out.w(`Name: ${_marko_escapeXml(node.name)} Children: `);

    if (node.children) {
      out.w("<ul>");

      for (const child of node.children) {
        out.w("<li>");

        _marko_dynamicTag(_renderTree, { ...child
        }, out, _component, "0");

        out.w("</li>");
      }

      out.w("</ul>");
    }
  }

  _marko_dynamicTag(_renderTree, { ...input.node
  }, out, _component, "6");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);
_marko_template.Component = _marko_defineComponent(_marko_component, _marko_template._);
_marko_template.meta = {
  id: _marko_componentType
};
export default _marko_template;