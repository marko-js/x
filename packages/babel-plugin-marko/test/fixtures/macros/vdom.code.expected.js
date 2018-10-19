import { t as _t } from "marko/src/runtime/vdom";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";

function _renderTree(node, out) {
  out.t("Name:");
  out.t(node.name);
  out.t("Children:");

  if (node.children) {
    out.be("ul", null, "2", component, 0, 0);

    for (const child of node.children) {
      out.be("li", null, "4", component, 0, 0);

      _renderTree({ ...child
      }, out);

      out.ee();
    }

    out.ee();
  }
}

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