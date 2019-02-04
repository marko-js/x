import _test from "./components/test.marko";
import { t as _t, d as _marko_dynamicTag } from "marko/src/runtime/vdom/helpers";

const _test_tag = _t(_test);

import { r as _marko_renderer, c as _marko_defineComponent } from "marko/src/components/helpers";
import { t as _t2 } from "marko/src/runtime/vdom";

const _marko_template = _t2(__filename),
      _marko_componentType = "M5ooyXS3";

_marko_template._ = _marko_renderer(function (input, out, __component, component, state) {
  const _dynamic_tag_renderBody = out => {
    out.be("div", {}, "3", component, 0, 0);
    out.t("Hello World");
    out.ee();
  };

  const _test_tag_renderBody = out => {
    out.be("div", {}, "1", component, 0, 0);
    out.t("Hello");
    out.ee();
  };

  if (!x) {
    out.be("div", {}, "0", component, 0, 0);
  }

  out.t("Hello")

  if (!x) {
    out.ee();
  }

  if (x) {
    _marko_dynamicTag(_test_tag_renderBody, null, out, __component, "5")
  } else {
    _test_tag({
      "renderBody": _test_tag_renderBody
    }, out, "2");
  }

  if (x) {
    _marko_dynamicTag(_dynamic_tag_renderBody, null, out, __component, "6")
  } else {
    _marko_dynamicTag(test, {
      "renderBody": _dynamic_tag_renderBody
    }, out, __component, "4");
  }
}, {
  ___type: _marko_componentType,
  ___implicit: true
})
_marko_template.Component = _marko_defineComponent(null, _marko_template._)
_marko_template.meta = {
  id: _marko_componentType,
  tags: ["./components/test.marko"]
}
export default _marko_template;