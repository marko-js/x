import { d as _marko_dynamicTag } from "marko/src/runtime/vdom/helpers";
import { r as _marko_renderer, c as _marko_defineComponent, rc as _marko_registerComponent } from "marko/src/runtime/components/helpers";
import { t as _t } from "marko/src/runtime/vdom";

const _marko_template = _t(__filename),
      _marko_componentType = _marko_registerComponent("9QKeN8cm", () => _marko_template),
      _marko_component = {};

_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  function _renderTree(node, out) {
    out.t("Name: ");
    out.t(node.name);
    out.t(" Children: ");

    if (node.children) {
      out.be("ul", null, "3", component, null, 0);

      for (const child of node.children) {
        out.be("li", null, "1", component, null, 0);

        _marko_dynamicTag(_renderTree, { ...child
        }, out, _component, "0");

        out.ee();
      }

      out.ee();
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