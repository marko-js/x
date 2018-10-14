import { t as _t } from "marko/src/html";
import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import _noUpdate from "../../../../../node_modules/marko/src/components/taglib/preserve-tag.js";
import _hello from "./components/hello/index.marko";

const _marko_template = _t(__filename),
      _marko_componentType = "/babel-preset-marko$1.0.0/test/fixtures-html/no-update-directive/template.marko";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  const _noUpdateKey = __component.___nextKey("0");

  _noUpdate({
    "cid": _noUpdateKey,
    "renderBody": out => {
      _hello({
        "renderBody": out => {
          _hello(null, out, "2");

          out.w("<div></div>");
        }
      }, out, "1");
    }
  }, out, `#${_noUpdateKey}`)
}, {
  ___type: _marko_componentType
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: "/babel-preset-marko$1.0.0/test/fixtures-html/no-update-directive/template.marko",
  tags: ["./components/hello/index.marko", "../../../../../node_modules/marko/src/components/taglib/preserve-tag.js"]
}
export default _marko_template;